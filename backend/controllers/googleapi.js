const express = require('express');
const axios = require('axios');
const app = express();

const gapi= async (req, res) => {
    const { location,radius,type } = req.query;
    console.log(req.query);
   [lat,long] = location.split(','); 
//    console.log(lat,long);
    try {
        console.log('inside try');
        
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${long}`,
                radius: radius,
                type: type,
                key: 'AIzaSyDFLQNuaX9EW1X6gdGbB81MAtpOQ8Pir0w'
            }
        });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
};
module.exports={gapi}

