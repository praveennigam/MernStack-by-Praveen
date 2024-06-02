import express from 'express';
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from '../controllers/orderController.js';
import { authenticateToken, authorizeAdmin } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/place', authenticateToken, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userOrders', authenticateToken, userOrders);
orderRouter.get('/list', authenticateToken, authorizeAdmin, listOrders);
orderRouter.post('/status', authenticateToken, authorizeAdmin, updateStatus);

export default orderRouter;