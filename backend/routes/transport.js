const express = require('express');
const router = express.Router();
const { get_aero_data ,get_bus_data,get_hotel_data} = require('../controllers/transport');

router.get('/aeroplane',get_aero_data);
router.get('/bus',get_bus_data);
router.get('/hotel',get_hotel_data);

module.exports = router;
