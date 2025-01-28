const User = require("../models/User");
const otpGenerator = require('otp-generator');
// const bcrypt = require('bcrypt');
const {sendEmail} = require('../emailService/email');
const {BadRequestError,UnauthenticatedError} = require('../errors/index')
const axios = require('axios')

const oauth = async(req,res)=>{
    console.log('oauth');
    const{headers:{authorization:auth_token},query:{oauth_provider:provider}} = req;
    if(!auth_token || !auth_token.startsWith('Bearer')){
        throw new UnauthenticatedError('No authentication header');
    }
    const token = auth_token.split(' ')[1];
    if(!provider)
    {
        throw new BadRequestError('no provider name specified');
    }
    let userData;
    if (provider === 'google') {
        userData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` }
        });
    } 
    else {
        return res.status(400).json({ error: `Unsupported provider: ${provider}` });
    }
    const { email, name,  sub: oauthId } = userData.data;
    console.log(email,name,oauthId);
    if (!email) {
        return res.status(400).json({ error: 'Failed to fetch user email from provider' });
    }

    let user = await User.findOne({ oauth_provider: provider, oauth_id: oauthId });
    if (!user) {
        user = await User.create({
            userName: name,  
            userEmail: email,
            oauth_provider: provider,
            oauth_id: oauthId,
            isVerified: true, 
        });
    }
    const jwttoken = user.createJWT();
    // console.log(req.headers);
    res.status(200).json({token:jwttoken,message:'success'});
}
const register = async(req,res)=>
{
        console.log("request",req);
        console.log('registering user');
        const { userName, userEmail, userPassword } = req.body;
        const user = await User.create({...req.body});
        const emailBody = `<p>Please click on the link to verify your account.<b> ${process.env.VITE_BASE_SERVER_URL}/api/v1/auth/verify/${user.verificationToken.token} </b></p>`
        const subject = `Verification Email`
        await sendEmail(userEmail, subject, emailBody);
        res.json({message: "Verification link sent to User email.",OTP:user.verificationToken.token});
}

const verifyUser = async(req,res) => {
    
        const {token} = req.params
        console.log(token);

        const isValidToken = await User.findOne({
            'verificationToken.token':token,
            'verificationToken.expires':{$gt : new Date()}
        })
        console.log(isValidToken);
        
        if(!isValidToken){
            return res.send(`Token Invalid or Expierd <br><a href= "${process.env.VITE_BASE_SERVER_URL}/User/resendVerfication/${token}">Resend Verification Mail</a>`)
        }
        isValidToken.isVerified = true;
        await isValidToken.save()
        res.send("Account Verification Sucessfully")
};

const resendVerificationEmail = async (req, res) => {
        const { token } = req.params;

        const user = await User.findOne({
            'verificationToken.token': token,
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const verificationToken = user.otp();

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        user.verificationToken.token = verificationToken;
        user.verificationToken.expires = expires;

        await user.save();

        const emailBody = `<p>Please click on the link to verify your account. <b>${process.env.VITE_BASE_SERVER_URL}/api/v1/auth/resendVerfication/${verificationToken}</b></p>`;
        const subject = "Verification Email";

        await sendEmail(user.userEmail, subject, emailBody);

        res.send("Please check your email for a new verification link");

};


const login = async(req,res)=>
{
    const{userEmail,userPassword} = req.body;
    
    // console.log(req.body);
    if(!userEmail || !userPassword)
    {
        throw new BadRequestError("please provide both username and password");
    }
    const user = await User.findOne({userEmail:userEmail});
    // console.log(user.userEmail);
    if(!user)
    {
        throw new UnauthenticatedError("please register first");
    }
    const isPasswordcorrect = user.checkPassword(userPassword);
    if(!isPasswordcorrect)
    {
        throw new UnauthenticatedError("invalid credentials!!!!!!");
    }
    if(!user.isVerified)
    {
        throw new UnauthenticatedError("account not verified,Please verify your account through email!");
    }
    const token = user.createJWT();

    res.json({message:'Successful login',token});
    // res.send('logged in');
}

module.exports = {register,login,verifyUser,resendVerificationEmail,oauth};