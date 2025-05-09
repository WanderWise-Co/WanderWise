const express = require('express');
const {spawn} = require('child_process')
const fs = require('fs')
const path = require('path')
const {BadRequestError} = require('../errors/index')

const hotel_reco = async(req,res)=>{
    const {selected_features} = req.query;
    console.log(selected_features)
    const pythonScriptPath = path.join(__dirname, '../scripts/hotalfinalreco.py');
    
    // Spawn the Python process
    const python = spawn('python', [pythonScriptPath,selected_features], {
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
            
            // try {
            //     // Process the accumulated output (trim whitespace)
            //     // const outputData = pythonOutput.trim();
            //     // console.log(outputData);

            //     // // Respond with the data
            //     // return res.json({ data: outputData });
                
            // } 
            try {
                // Process the accumulated output (trim whitespace)
                // const outputData = pythonOutput.trim();
                // console.log(outputData);

                // // Respond with the data
                // return res.json({ data: outputData });
                const outputFilePath = path.join(__dirname, '../scripts/outputs/hotel_reco.json');
            fs.readFile(outputFilePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading bus_data.json:', err);
                    return res.status(500).json({ error: 'Failed to load bus data' });
                }

                try {
                    const busData = JSON.parse(data);
                    res.json({ data: busData, pythonLogs: pythonOutput });
                } catch (err) {
                    console.error('Error parsing bus_data.json:', err);
                    res.status(500).json({ error: 'Invalid JSON data in bus_data.json' });
            }})}
            catch (err) {
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
    
    const python = spawn('python', [pythonScriptPath], {
        cwd: path.join(__dirname, '../scripts')
    });

    let pythonOutput = ''; 


    python.stdout.on('data', (data) => {
        pythonOutput += data.toString();
        console.log(`Python script output: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');
            
            try {
                // const outputData = pythonOutput.trim();
                // console.log(outputData);

                // return res.json({ data: outputData });
                const outputFilePath = path.join(__dirname, '../scripts/outputs/flight_reco.json');
            fs.readFile(outputFilePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading bus_data.json:', err);
                    return res.status(500).json({ error: 'Failed to load bus data' });
                }

                try {
                    const busData = JSON.parse(data);
                    res.json({ data: busData, pythonLogs: pythonOutput });
                } catch (err) {
                    console.error('Error parsing bus_data.json:', err);
                    res.status(500).json({ error: 'Invalid JSON data in bus_data.json' });
            }})
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
    console.log('hotel  reco');
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
                // const outputData = pythonOutput.trim();
                // console.log(outputData);

                // // Respond with the data
                // return res.json({ data: outputData });
                const outputFilePath = path.join(__dirname, '../scripts/outputs/bus_reco.json');
            fs.readFile(outputFilePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading bus_data.json:', err);
                    return res.status(500).json({ error: 'Failed to load bus data' });
                }

                try {
                    const busData = JSON.parse(data);
                    res.json({ data: busData, pythonLogs: pythonOutput });
                } catch (err) {
                    console.error('Error parsing bus_data.json:', err);
                    res.status(500).json({ error: 'Invalid JSON data in bus_data.json' });
                }
            });
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