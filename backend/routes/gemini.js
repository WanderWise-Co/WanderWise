const express = require('express');
const router = express.Router();
const{get_gemeni_data} = require('../controllers/gemini')



router.get('/',get_gemeni_data)

module.exports = router;