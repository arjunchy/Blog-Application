import User from '../model/user.js';

export const signupUser = async (req,resp) =>{
    try{
       const user = req.body;
       const newUser = new User(user);
       await newUser.save();

       return resp.status(200).json({msg : 'User created successfully'});
    }catch(err){
        return resp.status(500).json({msg : err.message});
    }
}