import express from 'express';
import { getCart, removeFromCart, addToCart } from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/auth.js'; // Fixed import

const cartRouter = express.Router();

cartRouter.post('/add', authenticateToken, addToCart);
cartRouter.post('/remove', authenticateToken, removeFromCart);
cartRouter.post('/get', authenticateToken, getCart);

export default cartRouter;