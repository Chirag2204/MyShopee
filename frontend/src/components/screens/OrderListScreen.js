import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { listOrders } from '../../actions/orderActions'
import { Meta } from '../Meta'

const OrderListScreen = ({ location, history }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error } = orderList

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])


    return (
        <>
            <Meta title='Admin Screen' />
            <h2>Orders List</h2>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hovered responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Paid Status</th>
                            <th>Delivered</th>
                            <th>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? <Message variant='success'>Paid</Message> : <Message variant='danger'>Not Paid</Message>}</td>
                                <td>{order.isDelivered ? <Message variant='success'>Delivered</Message> : <Message variant='danger'>Not Delivered</Message>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='warning' className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen
