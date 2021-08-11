import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json())

dotenv.config();
connectDB();

app.get("/", (req, res) => {
    res.send("Hello Client");
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

//Middlewares
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, function (req, res) {
    console.log(`server running on ${port} in ${process.env.NODE_ENV} mode`);
});