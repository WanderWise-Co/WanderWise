const express = require('express')
const router = express.Router();
const {findLocations} = require('../controllers/userPreference')


router.route('/').get(findLocations)


module.exports = router;