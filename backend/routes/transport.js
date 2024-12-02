const express = require('express');
const router = express.Router();
const { get_aero_data ,get_bus_data,get_hotel_data,get_rental_data,get_gemeni_data} = require('../controllers/transport');
const { aero_reco } = require('../controllers/recommendation');

router.get('/aeroplane',get_aero_data);
router.get('/bus',get_bus_data);
router.get('/hotel',get_hotel_data);
router.get('/rental',get_rental_data);
router.get('/gemeni',get_gemeni_data)

router.get('/aeroreco',aero_reco)

module.exports = router;
