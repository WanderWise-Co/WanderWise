const express = require('express');
const {spawn} = require('child_process')
const fs = require('fs')
const path = require('path')
const {BadRequestError} = require('../errors/index')

const get_gemeni_data = async (req, res) => {
    console.log('gemining');
    const python = spawn('python', [path.join(__dirname, '../scripts/gemeni.py')], {
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