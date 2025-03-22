import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (req, resp) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = { 
            username: req.body.username, 
            name: req.body.name, 
            password: hashedPassword 
        };

        const newUser = new User(user);
        await newUser.save();

        return resp.status(200).json({ msg: 'User created successfully' });
    } catch (err) {
        return resp.status(500).json({ msg: err.message });
    }
};

export const loginUser = async (req, resp) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return resp.status(400).json({ msg: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return resp.status(401).json({ msg: 'Password does not match' });
        }

        const accessToken = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.ACCESS_SECRET_KEY, 
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.REFRESH_SECRET_KEY
        );

        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        return resp.status(200).json({
            msg: 'Login successful',
            accessToken,
            refreshToken
        });
    } catch (err) {
        return resp.status(500).json({ msg: 'Error while logging in', error: err.message });
    }
};
