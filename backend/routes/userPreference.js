const express = require('express')
const router = express.Router();
const {findLocations,updateLocations,addLocations} = require('../controllers/userPreference')


router.get('/',findLocations)
router.post('/',addLocations)
router.post('/update',updateLocations)


module.exports = router;