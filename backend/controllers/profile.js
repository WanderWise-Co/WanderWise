const express = require('express');
const { StatusCodes } = require('http-status-codes');
const userPreference = require('../models/userPreference')
const User = require('../models/User');
const {UnauthenticatedError} = require('../errors/index')

const getUserData = async(req,res)=>{
    console.log("enter 1")
    const {_id} = req.user; 
    if(!_id)
    {
        throw new UnauthenticatedError("user id not found");
    }
    const user = await User.findOne({_id});
    console.log(user.userName)
    if(!user)
    {
        return res.status(StatusCodes.NOT_FOUND).json({msg:"no user found"});
    }
    if (!user || !user.userName || !user.userEmail ) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid input data" });
    }
    const pref = await userPreference.find({userPrefId:_id});
    if(!pref)
    {
        return res.status(StatusCodes.NOT_FOUND).json({msg:"no pref found"});
    }
    console.log("enter 2")
    res.status(StatusCodes.OK).json({user:{name:user.userName,email:user.userEmail},pref:pref});
    
}

module.exports = {getUserData};