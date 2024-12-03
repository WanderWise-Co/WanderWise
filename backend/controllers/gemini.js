const express = require('express');
const {spawn} = require('child_process')
const fs = require('fs')
const path = require('path')
const {BadRequestError} = require('../errors/index')

const get_gemeni_data = async (req, res) => {
    const { from,to,startDate, endDate } = req.body;
    if(!from || !to )
        {
            throw new BadRequestError('provide from and to ')
        }
        const parseDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month (0-based)
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
    
        };
        const today = new Date();
        const start = startDate ? parseDate(startDate) : parseDate(today);
        const end = endDate ? parseDate(endDate) : parseDate(today);
    const python = spawn('python', [path.join(__dirname, '../scripts/gemeni.py'),from,to,start,end], {
        cwd: path.join(__dirname, '../scripts'),
    });

    let pythonOutput = '';

    python.stdout.on('data', (data) => {
        pythonOutput += data.toString(); // Accumulate Python script output
    });

    python.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
    });

    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');
            
            try {
                // Here, process the string directly.
                const outputData = pythonOutput.trim(); // Remove any leading/trailing whitespace
                console.log(outputData);

                // Respond with the data
                return res.json({ data: outputData });
            } catch (err) {
                console.error('Error processing Python script output:', err);
                return res.status(500).json({ error: 'Failed to process Python output' });
            }
        } else {
            console.error(`Python script failed with exit code ${code}`);
            return res.status(500).json({ error: 'Python script execution failed' });
        }
    });
};

module.exports = {get_gemeni_data};