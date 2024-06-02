import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config';

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
connectDB();

// Static files
app.use(express.static(join(__dirname, './admin/dist')));
app.use(express.static(join(__dirname, './frontend/dist')));

// Routes
app.get('*', function(req, res) {
    res.sendFile(join(__dirname, './admin/dist/index.html'));
});

app.get('/', function(req, res) {
    res.sendFile(join(__dirname, './frontend/dist/index.html'));
});

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});