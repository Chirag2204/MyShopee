import Order from '../models/ordermodel.js'
import asyncHandler from 'express-async-handler'


//asyncHandler is used to handle exceptions in asynchronous methods
//@desc To create new order
//@route POST /api/orders
//access Private

export const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body
    // console.log(req.body);
    console.log(req.user)
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

//@desc To get order by id
//@route GET /api/orders/:id
//access Private

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

//@desc To Update Order To paid
//@route PUT /api/orders/:id/pay
//access Private

export const updateOrdertoPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.isPaidAt = new Date()
        order.payment = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        // order.markModified('paidAt')
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

//@desc To GET List of Orders On profile Screen
//@route GET /api/orders/myorders
//access Private

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

//@desc To GET List of all  Orders 
//@route GET /api/orders
//access Private/Admin

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

//@desc To Update Order To delivered
//@route PUT /api/orders/:id/delivered
//access Private

export const updateOrdertoDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.isDeliveredAt = new Date()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

