const { StatusCodes } = require('http-status-codes');
const userPreference = require('../models/userPreference')
const{BadRequestError,NotFoundError} = require('../errors/index')
const findLocations = async(req,res)=>{
    const{userPrefId:_id} = req.user;
    if(!userPrefId)
    {
        throw new BadRequestError('Ambiguous user')
    }
    const locations = await userPreference.find({userPrefId});
    if(!locations){
        throw new NotFoundError('there are no location preference for this user');
    }
    res.status(StatusCodes.OK).json({locations:locations});
}
const updateLocations = async(req,res)=>{
    const{user:{userPrefId:_id},query:{category},body:{pereference}} = req;
    
    // const {category} = req.query;
    if(!category)
    {
        throw new BadRequestError('Category cannot be empty');
    }
    const locations =await  userPreference.findOneAndUpdate({userPrefId,category},{pereference},{new:true,runValidators:true});
    if(!locations)
    {
        throw new NotFoundError(`the resources are found for the user:${userPrefId}`);
    }
    res.status(StatusCodes.OK).json({msg:'updated successfully'});
}

module.exports = {findLocations,updateLocations};