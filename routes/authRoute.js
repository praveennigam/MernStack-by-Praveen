import express from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const router = express.Router();

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

export default router;