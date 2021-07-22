import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from './models/productmodel.js';
import User from './models/usermodel.js';
import Order from './models/ordermodel.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProduct = products.map(product => {
            return { ...product, user: adminUser }
        });

        await Product.insertMany(sampleProduct);
        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.log(`error Occoured ${error}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.log(`error Occoured ${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}