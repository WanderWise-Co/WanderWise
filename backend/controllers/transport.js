const express = require('express');
const {spawn} = require('child_process')
const fs = require('fs')
const path = require('path')
const {BadRequestError} = require('../errors/index')

const get_aero_data = async (req, res) => {

    const { startDate, endDate } = req.body;

        const parseDate = (dateString) => {
            const date = new Date(dateString);
            return {
                month: date.toLocaleString('default', { month: 'long' }),
                date: date.getDate(),
            };
        };
        const today = new Date();
        const start = startDate ? parseDate(startDate) : parseDate(today);
        const end = endDate ? parseDate(endDate) : parseDate(today);
        const month = start.month;
        const date = start.date;

    const pythonScriptPath = path.join(__dirname, '../scripts/aeroplanefinaldata.py');

    const python = spawn('python', [pythonScriptPath,month,date], {
        cwd: path.join(__dirname, '../scripts')
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

            const filePath = path.join(__dirname, '../scripts/outputs/flights.json');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading flights.json:', err);
                    return res.status(500).json({ error: 'Failed to load flight data' });
                }

                if (!data.trim()) {
                    console.error('flights.json is empty');
                    return res.status(500).json({ error: 'Flight data file is empty' });
                }

                try {
                    const flightData = JSON.parse(data);
                    res.json({ data: flightData });
                } catch (parseError) {
                    console.error('Error parsing flights.json:', parseError);
                    res.status(500).json({ error: 'Failed to parse flight data' });
                }
            });
        } else {
            console.error(`Python script failed with exit code ${code}`);
            res.status(500).json({ error: 'Python script execution failed' });
        }
    });
};
const get_bus_data = async(req,res)=>{
   
    const { from,to,startDate, endDate } = req.body;
    if(!from || !to )
    {
        throw new BadRequestError('provide from and to ')
    }
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return {
            month: date.toLocaleString('default', { month: 'long' }),
            date: date.getDate(),
        };
    };
    const today = new Date();
    const start = startDate ? parseDate(startDate) : parseDate(today);
    const end = endDate ? parseDate(endDate) : parseDate(today);
    const month = start.month;
    const date = start.date;

    const python = spawn('python', [path.join(__dirname, '../scripts/busdatafinal.py'),from,to,month,date],{
        cwd: path.join(__dirname, '../scripts')
    });

    let pythonOutput = ''; 
    let pythonError = '';  

    python.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
        pythonOutput += data.toString(); 
    });

    
    python.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
        pythonError += data.toString();
    });

   
    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');

            const outputFilePath = path.join(__dirname, '../scripts/outputs/bus_data.json');
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
        } else {
            console.error(`Python script failed with exit code ${code}`);
            res.status(500).json({ 
                error: 'Python script execution failed', 
                pythonError: pythonError 
            });
        }
    });

}

const get_hotel_data = async (req, res) => {

    const { from,to,startDate, endDate } = req.body;
    if(!from || !to )
    {
        throw new BadRequestError('provide from and to ')
    }
    // const parseDate = (dateString) => {
    //     const date = new Date(dateString);
    //     return {
    //         month: date.toLocaleString('default', { month: 'long' }),
    //         date: date.getDate(),
    //     };
    // };
    // const today = new Date();
    // const start = startDate ? parseDate(startDate) : parseDate(today);
    // const end = endDate ? parseDate(endDate) : parseDate(today);
    // const month = start.month;
    // const date = start.date;
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date as "YYYY-MM-DD"
        return date.toISOString().split('T')[0];
    };
    
    const today = new Date();
    const start = startDate ? parseDate(startDate) : parseDate(today);
    const end = endDate ? parseDate(endDate) : parseDate(today);

    const python = spawn('python', [path.join(__dirname, '../scripts/hotalcompletefinaldone1.py'),from,to,start,end],{
        cwd: path.join(__dirname, '../scripts') 
    });

    python.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
    });

    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');

            const jsonFilePath = path.join(__dirname, '../scripts/outputs/hotel_reviews.json');
            fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading hotel_reviews.json:', err);
                    return res.status(500).json({ error: 'Failed to load hotel data' });
                }
                try {
                    const hotelData = JSON.parse(data);
                    console.log(hotelData);
                    return res.json({ data: hotelData });
                } catch (parseErr) {
                    console.error('Error parsing hotel_reviews.json:', parseErr);
                    return res.status(500).json({ error: 'Invalid JSON format' });
                }
            });
        } else {
            console.error(`Python script failed with exit code ${code}`);
            return res.status(500).json({ error: 'Python script execution failed' });
        }
    });
};

const get_rental_data = async (req, res) => {

    const { from } = req.body;
    if(!from )
    {
        throw new BadRequestError('provide from and to ')
    }
    // const parseDate = (dateString) => {
    //     const date = new Date(dateString);
    //     return {
    //         month: date.toLocaleString('default', { month: 'long' }),
    //         date: date.getDate(),
    //     };
    // };

    const python = spawn('python', [path.join(__dirname, '../scripts/rental.py'),from],{
        cwd: path.join(__dirname, '../scripts') 
    });

    python.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
    });

    python.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');

            const jsonFilePath = path.join(__dirname, '../scripts/outputs/rental.json');
            fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading rental.json:', err);
                    return res.status(500).json({ error: 'Failed to load hotel data' });
                }
                try {
                    const hotelData = JSON.parse(data);
                    console.log(hotelData);
                    return res.json({ data: hotelData });
                } catch (parseErr) {
                    console.error('Error parsing rental.json:', parseErr);
                    return res.status(500).json({ error: 'Invalid JSON format' });
                }
            });
        } else {
            console.error(`Python script failed with exit code ${code}`);
            return res.status(500).json({ error: 'Python script execution failed' });
        }
    });
};

const get_gemeni_data = async (req, res) => {
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


module.exports = {get_aero_data,get_bus_data,get_hotel_data,get_rental_data,get_gemeni_data};




//############## aeroplane

// const get_aero_data = async(req,res)=>{
//     // console.log('Aeroplaning started...');
//     // Spawn the Python code
//     const python = spawn('python', [path.join(__dirname, '../scripts/aeroplanefinaldata.py')]);
//     // console.log(path.join(__dirname, '../scripts/aeroplanefinaldata.py'));

//     python.on('close', (code) => {
//         if (code === 0) {
//             console.log('Python script executed successfully');

//             // Use require to load the JSON file
//             try {
//                 const flightData = require('../scripts/outputs/flights.json');
//                 res.json({ data: flightData });
//             } catch (err) {
//                 console.error('Error requiring flights.json:', err);
//                 return res.status(500).json({ error: 'Failed to load flight data' });
//             }
//         } else {
//             console.error(`Python script failed with exit code ${code}`);
//             res.status(500).json({ error: 'Python script execution failed' });
//         }
//     });
// }

//##########################  bus
 // const python = spawn('python', [path.join(__dirname, '../scripts/busdatafinal.py')]);

    // python.on('close', (code) => {
    //     if (code === 0) {
    //         console.log('Python script executed successfully');

    //         // Use require to load the JSON file
    //         try {
    //             const flightData = require('../scripts/outputs/bus_data.json');
    //             res.json({ data: flightData });
    //         } catch (err) {
    //             console.error('Error requiring bus_data.json:', err);
    //             return res.status(500).json({ error: 'Failed to load bus data' });
    //         }
    //     } else {
    //         console.error(`Python script failed with exit code ${code}`);
    //         res.status(500).json({ error: 'Python script execution failed' });
    //     }
    // });


    //############################## hotel 
    // const get_hotel_data = async(req,res)=>{
//     const python = spawn('python', [path.join(__dirname, '../scripts/hotalcompletefinaldone1.py')]);
//     python.on('close', (code) => {
//         if (code === 0) {
//             console.log('Python script executed successfully');

//             // Use require to load the JSON file
//             try {
//                 const hotelData = require('../scripts/outputs/hotel_reviews.json');
//                 console.log(hotelData);
//                 res.json({ data: hotelData });
//             } catch (err) {
//                 console.error('Error requiring flights.json:', err);
//                 return res.status(500).json({ error: 'Failed to load flight data' });
//             }
//         } else {
//             console.error(`Python script failed with exit code ${code}`);
//             res.status(500).json({ error: 'Python script execution failed' });
//         }
//     });

// }