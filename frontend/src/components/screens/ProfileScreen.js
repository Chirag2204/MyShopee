import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import Message from '../Message'
import Loader from '../Loader'
import { listMyOrders } from '../../actions/orderActions'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userProfileUpdate = useSelector(state => state.userProfileUpdate)
    const { success } = userProfileUpdate
    const myOrderList = useSelector(state => state.myOrderList)
    const { loading: loadingOrders, error: errorOrders, orders = [] } = myOrderList

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user?.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, userInfo, history, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords Do Not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
            //DISPATCH PROFILE
        }
    }

    return (
        <Row>
            <Col md={3} >
                <h2>User Profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>User Updated Successfully</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className='py-3'>
                    <Form.Group controlId='name' className='py-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={(e) => { setName(e.target.value) }}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='py-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='py-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='py-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' onClick={submitHandler}>Update</Button>
                </Form>
            </Col>
            {/* <Col md={3}></Col> */}
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
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
            </Col>
        </Row >
    )
}

export default ProfileScreen
