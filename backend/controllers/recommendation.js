const express = require('express');
const {spawn} = require('child_process')
const fs = require('fs')
const path = require('path')
const {BadRequestError} = require('../errors/index')

const hotel_reco = async(req,res)=>{
    const {selected_features} = req.body;
    const pythonScriptPath = path.join(__dirname, '../scripts/hotalfinalreco.py');
    
    // Spawn the Python process
    const python = spawn('python', [pythonScriptPath], {
        cwd: path.join(__dirname, '../scripts')
    });

    let pythonOutput = ''; // Initialize variable to accumulate Python output

    // Collect the data from stdout
    python.stdout.on('data', (data) => {
        pythonOutput += data.toString(); // Accumulate data in the variable
        console.log(`Python script output: ${data}`);
    });

    // Capture errors from stderr
    python.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    // Handle the process closure
    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');
            
            try {
                // Process the accumulated output (trim whitespace)
                const outputData = pythonOutput.trim();
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
}

const aero_reco = async (req, res) => {
    const pythonScriptPath = path.join(__dirname, '../scripts/aerofinalreco.py');
    
    // Spawn the Python process
    const python = spawn('python', [pythonScriptPath], {
        cwd: path.join(__dirname, '../scripts')
    });

    let pythonOutput = ''; // Initialize variable to accumulate Python output

    // Collect the data from stdout
    python.stdout.on('data', (data) => {
        pythonOutput += data.toString(); // Accumulate data in the variable
        console.log(`Python script output: ${data}`);
    });

    // Capture errors from stderr
    python.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    // Handle the process closure
    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');
            
            try {
                // Process the accumulated output (trim whitespace)
                const outputData = pythonOutput.trim();
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
const bus_reco = async (req, res) => {
    const pythonScriptPath = path.join(__dirname, '../scripts/busfinalreco.py');
    
    // Spawn the Python process
    const python = spawn('python', [pythonScriptPath], {
        cwd: path.join(__dirname, '../scripts')
    });

    let pythonOutput = ''; // Initialize variable to accumulate Python output

    // Collect the data from stdout
    python.stdout.on('data', (data) => {
        pythonOutput += data.toString(); // Accumulate data in the variable
        console.log(`Python script output: ${data}`);
    });

    // Capture errors from stderr
    python.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    // Handle the process closure
    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');
            
            try {
                // Process the accumulated output (trim whitespace)
                const outputData = pythonOutput.trim();
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
module.exports = {aero_reco,bus_reco,hotel_reco};