const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:[true,'username is required'],
        unique:[true,"username already exists"],
        minlength:10,
        maxlength:30,
    },
    userEmail:{
        type:String,
        unique:true,
        require:[true,"email is mandatory"]
        
    },
    userPassword:{
        type:String,
        require:[true,"Password is required"]
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    OTP_verificationToken:{
        OTP:String,
        expires:Date
    },
    verificationToken:{
        token:String,
        expires:Date
    }
});

userSchema.pre('save',async function(next){
    const salt = bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password,salt); //hashing password

    //creating verification token
    this.verificationToken.token = this.otp();

    //expiring date
    this.verificationToken.expires = new Date().setMinutes(expires.getMinutes()+5);
});

//otp generator
userSchema.methods.otp = ()=>{
    return otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false});
}
userSchema.methods.checkPassword = async function(newpassword){
    const match = await bcrypt.compare(newpassword,this.password)
    return match;

}

userSchema.methods.createJWT = async function()
{
    return jwt.sign({userId:this._id,name:this.userName});
}



module.exports = mongoose.model('user',userSchema);

module.exports = userModel;