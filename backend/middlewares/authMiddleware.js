import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AsyncHandler from 'express-async-handler'

const protect = AsyncHandler(async (req, res, next) =>{
    let token = null;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user, 'as')
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not authorized , no token')
        }

    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized , no token')
    }
    next()
})

export default protect