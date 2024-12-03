const express = require('express');
const router = express.Router();
const{aero_reco,hotel_reco,bus_reco} = require('../controllers/recommendation');


router.get('/aeroreco',aero_reco);
router.get('/busreco',bus_reco);
router.get('/hotelreco',hotel_reco);

module.exports = router;