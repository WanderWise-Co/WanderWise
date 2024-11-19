const express = require('express')
const router = express.Router()

const{gapi} = require('../controllers/googleapi')

router.get('/googleApi',gapi);

module.exports = router;