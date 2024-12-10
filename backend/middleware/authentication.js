const jwt = require('jsonwebtoken')
const {UnauthenticatedError}= require('../errors/unauthenticated')


const authMiddle = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('No authentication header');
    }
    const token = authHeader.split(" ")[1];

    try {
        console.log('verfying  token');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ error: 'Token has expired' });
        }
        // const{_id,name} = decoded;
        req.user = { _id:decoded.userId,name:decoded.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError(`Invalid token ${error}`);
    }


}

module.exports = authMiddle; 

