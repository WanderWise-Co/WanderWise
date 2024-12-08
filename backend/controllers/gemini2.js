const express =require('express');
const {spawn} = require('child_process')
const path = require('path')
const fs = require('fs')
const {BadRequestError} = require('../errors/index')
const  get_gemini_data= async(req,res)=>{
    
    console.log('hi from gemini2')
    const{from,to,startDate,endDate} = req.query;
    const pythonScriptPath = path.join(__dirname, '../scripts/gemini2.py');
    console.log(path.join(__dirname, '../scripts/hotalfinalreco.py'))
    const python = spawn('python', [pythonScriptPath,startDate,endDate,from,to], {
        cwd: path.join(__dirname, '../scripts/')
    });
    python.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });


    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');
            //need to create pdf here
        } else {
            console.error(`Python script failed with exit code ${code}`);
            res.status(500).json({ error: 'Python script execution failed' });
        }
    });
    res.status(200).json({msg:"baka u used gemini2"});
    
}

module.exports = {get_gemini_data}