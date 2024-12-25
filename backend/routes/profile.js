const express = require('express');
const router = express.Router();
const {getUserData} = require('../controllers/profile');
router.get('/',getUserData);

module.exports = router;