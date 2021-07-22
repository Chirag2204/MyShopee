import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
    res.send("Hello Client");
})

app.use('/api/products', router)

//Middleware

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, function (req, res) {
    console.log(`server running on ${port} in ${process.env.NODE_ENV} mode`);
});