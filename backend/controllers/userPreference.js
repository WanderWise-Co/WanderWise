const { StatusCodes } = require('http-status-codes');
const userPreference = require('../models/userPreference')
const{BadRequestError,NotFoundError} = require('../errors/index')
const findLocations = async(req,res)=>{
    const{userPrefId:_id} = req.user;
    
    const locations = await userPreference.find({userPrefId});
    res.status(StatusCodes.OK).json({locations:locations});
}
const updateLocations = async(req,res)=>{
    const{userPrefId:_id} = req.user;
    
    const {category} = req.query;
    if(!category)
    {
        throw new BadRequestError('Category cannot be empty');
    }
    const locations = userPreference.findOneAndUpdate({userPrefId,category},{},{new:true,runValidators:true});
    if(!locations)
    {
        throw new NotFoundError(`the resources are found for the user:${userPrefId}`);
    }
}

module.exports = {findLocations,updateLocations};