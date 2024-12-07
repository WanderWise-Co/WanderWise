const { StatusCodes } = require('http-status-codes');
const userPreference = require('../models/userPreference')
const{BadRequestError,NotFoundError} = require('../errors/index');
// const { preferences } = require('joi');

const findLocations = async(req,res)=>{
    console.log('hello');
    const{_id:userPrefId} = req.user;
    if(!userPrefId)
    {
        throw new BadRequestError('Ambiguous user')
    }
    const userPreferences = await userPreference.find().populate('userPrefId');
    console.log(userPreferences)
    const locations = await userPreference.find({userPrefId});
    console.log('created');
    // if(!locations){
    //     console.log('error')
    //     throw new NotFoundError('there are no location preference for this user');
    // }
    res.status(StatusCodes.OK).json({locations});
}
const addLocations = async (req, res) => {
    console.log("entering")
    const { user: { _id: userPrefId }, body: { location, category } } = req;
    console.log("entering 2")
    console.log(userPrefId, category, location);

    if (!userPrefId || !location || !category) {
        throw new BadRequestError('Ambiguous user or data not available');
    }
    console.log('CREATING');
    try {
        const data = await userPreference.create({ userPrefId:userPrefId, category:category, location:location });
        res.status(StatusCodes.CREATED).json({ data });
    } catch (err) {
        console.error(err);
        throw new BadRequestError('Error creating location preference');
    }
};

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

module.exports = {findLocations,updateLocations,addLocations};