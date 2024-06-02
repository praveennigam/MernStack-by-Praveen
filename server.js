import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import authRouter from './routes/authRoute.js';
import { authenticateToken, authorizeAdmin } from './middleware/auth.js';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB().catch(err => console.error(err));

// Static files
app.use(express.static(join(__dirname, './frontend/dist')));
app.use('/admin', authenticateToken, authorizeAdmin, express.static(join(__dirname, './admin/dist')));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/admin/*', authenticateToken, authorizeAdmin, (req, res) => {
    res.sendFile(join(__dirname, './admin/dist/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, './frontend/dist/index.html'));
});

app.get('/', (req, res) => {
    res.send('API Working');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});