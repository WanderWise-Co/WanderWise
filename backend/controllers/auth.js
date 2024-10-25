const User = require("../models/User");
const otpGenerator = require('otp-generator');
// const bcrypt = require('bcrypt');
const {sendEmail} = require('../emailService/email');
const {BadRequestError,UnauthenticatedError} = require('../errors/index')
// userModel
const register = async(req,res)=>
{

        // console.log(req.body);
        const { userName, userEmail, userPassword } = req.body;

        // const isUserExisting = await User.findOne({userEmail : userEmail})
        // if (!isUserExisting) {
        //     return res.status(400).json({message:"User already exists"})
        // }
        
        // const newUser = await User({
        //     userName : userName, 
        //     userPassword : hashedPassword, 
        //     userEmail : userEmail,
        //     verificationToken:{
        //         token: verificationToken,
        //         expires:expires
        //     }
        // })

        // console.log(newUser);  
        // await newUser.save(); 
        
        const user = await User.create({...req.body});
        // console.log(user);
        // const token = user.createJWT();
       
        // console.log(userEmail);
        const emailBody = `<p>Please click on the link to verify your account.<b> http://localhost:3000/api/v1/auth/verify/${user.verificationToken.token} </b></p>`
        const subject = `Verification Email`
        await sendEmail(userEmail, subject, emailBody);
        res.json({message: "Verification link sent to User email.",OTP:user.verificationToken.token});

    // res.send('registered User');
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
            return res.send(`Token Invalid or Expierd <br><a href= "http://localhost:3000/User/resendVerfication/${token}">Resend Verification Mail</a>`)
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

        const emailBody = `<p>Please click on the link to verify your account. <b>http://localhost:3000/api/v1/auth/resendVerfication/${verificationToken}</b></p>`;
        const subject = "Verification Email";

        await sendEmail(user.userEmail, subject, emailBody);

        res.send("Please check your email for a new verification link");

};


const login = async(req,res)=>
{
    const{username,password} = req.body;
    
    console.log(req.body);
    if(!username || !password)
    {
        throw new BadRequestError("please provide both username and password");
    }
    const user = await User.findOne({userName:username});
    console.log(user.userEmail);
    if(!user)
    {
        throw new UnauthenticatedError("please register first");
    }
    const isPasswordcorrect = user.checkPassword(password);
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

module.exports = {register,login,verifyUser,resendVerificationEmail};