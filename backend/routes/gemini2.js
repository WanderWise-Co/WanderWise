const express = require('express')
const router = express.Router()
const{get_gemini_data} = require('../controllers/gemini2.js')
router.get('/',get_gemini_data);

module.exports  = router;