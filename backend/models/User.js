const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator'); // Assuming otpGenerator is being used

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, "username already exists"],
        maxlength: 30,
    },
    userEmail: {
        type: String,
        unique: true,
        required: [true, "email is mandatory"]
    },
    userPassword: {
        type: String,
        required: [true, "Password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    OTP_verificationToken: {
        OTP: String,
        expires: Date
    },
    verificationToken: {
        token: String,
        expires: Date
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10); // await the genSalt function
    this.userPassword = await bcrypt.hash(this.userPassword, salt); //hashing password

    //creating verification token
    this.verificationToken.token = this.otp();

    //expiring date
    this.verificationToken.expires = new Date(new Date().setMinutes(new Date().getMinutes() + 5)); // updated expiry time logic

    next();
});

//otp generator
userSchema.methods.otp =  function () {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
}

userSchema.methods.checkPassword = async function (newPassword) {
    const match = await bcrypt.compare(newPassword, this.userPassword); // correct comparison using userPassword
    return match;
}

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.userName }, process.env.JWT_SECRET, { expiresIn: '1d' }); // JWT created
}

module.exports = mongoose.model('User', userSchema);
