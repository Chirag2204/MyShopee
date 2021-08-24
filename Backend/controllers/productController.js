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

//@desc To delete product 
//@route DELETE /api/products/:id
//access Private/Admin

export const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove()
        res.json({ message: 'Product Deleted' });
    } else {
        res.status(404)
        throw new Error(`Product Not Found`)
    }
})

//@desc To create a product
//@route POST /api/products
//access Private/Admin

export const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample Name',
        price: '0',
        user: req.user._id,
        brand: 'Sample Brand',
        image: '/images/sample.jpg',
        category: 'Sample Category',
        description: 'Sample Description',
        countInStock: 0,
        numOfReviews: 0
    })

    const createdProduct = await product.save()
    res.json(createdProduct)
})

//@desc To edit a product
//@route PUT /api/products/:id
//access Private/Admin

export const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, brand, image, category, description, countInStock, numOfReviews } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.brand = brand
        product.image = image
        product.category = category
        product.description = description
        product.countInStock = countInStock
        product.numOfReviews = numOfReviews

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } else {
        res.status(404)
        throw new Error('Product Not Found!')
    }
})
