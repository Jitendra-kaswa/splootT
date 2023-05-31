import {Router} from 'express';
import { UserModel } from '../models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router:Router = Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, age } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password should be at least 6 characters long' });
        }

        if (!name || name.trim().length === 0) {
            return res.status(400).json({ error: 'Name is required' });
        }

        if (!age || age < 0) {
            return res.status(400).json({ error: 'Age should be a positive number' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            name,
            age,
        });
        await newUser.save()

        res.json({ data: newUser});
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'my-auth-secret');

        res.setHeader('Authorization', `Bearer ${token}`);
        res.json({ data: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export const authRoute =  router;
