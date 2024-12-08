const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { BadRequestError } = require('../errors/index');
const userPreference = require('../models/userPreference');
const PDFDocument = require('pdfkit');

async function createPDF(jsonData, outputFilePath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(outputFilePath);

        doc.pipe(writeStream);

        // Add title
        doc.fontSize(20).text("Travel Plan", { align: 'center' }).moveDown();

        // Add content
        doc.fontSize(12).text(jsonData.travel_plan, { align: 'left', lineGap: 6 });

        // Finalize and save the PDF
        doc.end();

        writeStream.on('finish', () => {
            console.log(`PDF generated: ${outputFilePath}`);
            resolve();  // Resolve the promise when writing is complete
        });

        writeStream.on('error', (err) => {
            console.error('Error writing PDF:', err);
            reject(err);  // Reject the promise if an error occurs
        });
    });
}

const get_gemini_data = async (req, res) => {
    const { _id: userPrefId } = req.user;
    const { from, to, startDate, endDate } = req.query;

    if (!startDate || !endDate || !from || !to) {
        return res.status(400).json({ error: 'Send all required details.' });
    }

    const preference = await userPreference.find({ userPrefId, from, to });
    if (!preference) {
        return res.status(404).json({ msg: "User preference not found." });
    }

    const pythonScriptPath = path.join(__dirname, '../scripts/gemini2.py');
    const preferenceStr = JSON.stringify(preference);

    const python = spawn('python', [pythonScriptPath, startDate, endDate, from, to, preferenceStr], {
        cwd: path.join(__dirname, '../scripts/')
    });

    python.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    python.on('close', async (code) => {
        if (code === 0) {
            const filePath = path.join(__dirname, '../scripts/outputs/gemini2.json');
            fs.readFile(filePath, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading gemini2.json:', err);
                    return res.status(500).json({ error: 'Failed to load data.' });
                }

                if (!data.trim()) {
                    console.error('gemini2.json is empty.');
                    return res.status(500).json({ error: 'Data file is empty.' });
                }

                try {
                    const jsonData = JSON.parse(data);
                    const outputFilePath = path.join(__dirname, '../scripts/outputs/TravelPlan.pdf');

                    // Use async/await to ensure PDF is generated before sending the file
                    await createPDF(jsonData, outputFilePath);

                    // Send the PDF once it's created
                    res.sendFile(outputFilePath, (err) => {
                        if (err) {
                            console.error('Error sending PDF:', err);
                            return res.status(500).json({ error: 'Failed to send the PDF.' });
                        }
                    });
                } catch (parseError) {
                    console.error('Error parsing gemini2.json:', parseError);
                    return res.status(500).json({ error: 'Failed to parse data.' });
                }
            });
        } else {
            console.error(`Python script failed with exit code ${code}.`);
            return res.status(500).json({ error: 'Python script execution failed.' });
        }
    });
};

module.exports = { get_gemini_data };
