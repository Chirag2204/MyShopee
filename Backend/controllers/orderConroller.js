import Order from '../models/ordermodel.js'
import asyncHandler from 'express-async-handler'


//asyncHandler is used to handle exceptions in asynchronous methods
//@desc To create new order
//@route POST /api/orders
//access Public

export const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body
    console.log(req.body);
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No items Found')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(200).json(createdOrder)
    }
})
