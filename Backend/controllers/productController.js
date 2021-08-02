import Product from '../models/productmodel.js'
import asyncHandler from 'express-async-handler'


//asyncHandler is used to handle exceptions in asynchronous methods
//@desc To fetch all products
//@route /api/products
//access Public

export const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({});

    res.json(products);
})

//@desc To fetch a particular product
//@route /api/products/:id
//access Public

export const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);


    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error(`Product Not Found`)
    }
})
