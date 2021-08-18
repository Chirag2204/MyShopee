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
        console.log('At bACKENBD' + createdOrder)
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
    console.log(req.body)
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
        console.log(updatedOrder)
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
    console.log(orders)
    res.json(orders)
})

