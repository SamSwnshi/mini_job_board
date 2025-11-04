

import User from "../models/User.js";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 

const generateToken = (id, role) => {
    return jwt.sign({ userId: id, role: role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};


export const login = async(req ,res) =>{
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials.' });
        }

    
        const isMatchingPassword = await bcrypt.compare(password, user.password);
        if (!isMatchingPassword) {
            return res.status(400).json({ msg: 'Invalid Credentials.' });
        }

        const token = generateToken(user._id, user.role);

        res.json({ 
            token, 
            role: user.role, 
            username: user.username,
            msg: 'Login successful.' 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during login.');
    }
}

export const register = async(req ,res) =>{
    const { username, email, password, role, companyName } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email.' });
        }
       
        user = new User({ username, email, password, role, companyName });
        await user.save();

        const token = generateToken(user._id, user.role);

        res.status(201).json({ 
            token, 
            role: user.role, 
            username: user.username,
            msg: `${user.role} registered successfully!` 
        });
    } catch (err) {
   
        console.error(err.message); 
        res.status(500).send('Server Error during registration.');
    }
}