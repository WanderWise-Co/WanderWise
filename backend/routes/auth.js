const express = require('express')
const router = express.Router()

const{login,register,verifyUser,resendVerificationEmail} = require('../controllers/auth')


router.post('/login',login)
router.post('/register',register)



router.get('/verify/:token',verifyUser);
router.get('/resendVerfication/:token',resendVerificationEmail);
module.exports = router;