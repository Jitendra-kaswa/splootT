import {Router} from 'express';
import { UserModel } from '../models/User';

const router:Router = Router();

router.patch('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, age } = req.body;

        if (name && name.trim().length === 0) {
            return res.status(400).json({ error: "Name can't be empty"});
        }

        if (age && age <= 0) {
            return res.status(400).json({ error: 'Age should be a positive number' });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, age },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
export const userRoute =  router;
