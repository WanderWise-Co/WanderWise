const jwt = require('jsonwebtoken')
const {UnauthenticatedError}= require('./errors/unauthenticated')


const authMiddle = (req,res,next)=>{

    const authHeader = req.headers.Authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('No authentication header');
    }
    const token = authHeader.split(" ")[1];

    try {
        console.log('verfying  token');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const{_id,name} = decoded;
        req.user = { userId: _id, name: name }

        next();
    } catch (error) {
        throw new UnauthenticatedError(`Invalid token ${error}`);
    }


}


module.exports = authMiddle; 

