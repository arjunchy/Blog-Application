import User from '../model/user.js';
import bcrypt from 'bcrypt';
export const signupUser = async (req, resp) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = { username: req.body.username, name: req.body.name, password: hashedPassword };

        const newUser = new User(user);
        await newUser.save();

        return resp.status(200).json({ msg: 'User created successfully' });
    } catch (err) {
        return resp.status(500).json({ msg: err.message });
    }
}