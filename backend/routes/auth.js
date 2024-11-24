const express = require('express')
const router = express.Router()

const{login,register,verifyUser,resendVerificationEmail,oauth} = require('../controllers/auth')

router.get('/',(req,res)=>{res.json("calling")});
router.post('/login',login);
router.post('/register',register);
router.post('/Oauth',oauth);


router.get('/verify/:token',verifyUser);
router.get('/resendVerfication/:token',resendVerificationEmail);
module.exports = router;