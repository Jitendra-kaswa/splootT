import {Router} from 'express';
import { ArticleModel } from '../models/Article';
import { UserModel } from '../models/User';

const router:Router = Router();

router.post('/users/:userId/articles', async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, description } = req.body;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({ error: 'Title is required' });
        }

        if (!description || description.trim().length === 0) {
            return res.status(400).json({ error: 'Description is required' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newArticle = await ArticleModel.create({
            title,
            description,
            author: user._id,
        });

        res.json({ data: newArticle });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/articles', async (req, res) => {
    try {
        const articles = await ArticleModel.find().populate('author', '-password -__v');;

        res.json({ data: articles });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export const articlesRoute =  router;
