import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (request, response, next) =>{
    const authHeader = request.header['authorization']
    const token = authHeader && authHeader.split('')[1];

    if(token == null){
        return response.status(401).json({ msg: 'token is missing'});
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
        if(err) {
            return response.status(403).json({ msg: 'Invalid token' });
        }
        request.user = user;
        next();
    })
}