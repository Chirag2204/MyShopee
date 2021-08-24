import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../Message'
import Loader from '../Loader'
import { deliverOrder, getOrderDetails, payOrder } from '../../actions/orderActions'
import { ORDER_DELIVER_RESET, ORDER_DETAILS_RESET, ORDER_PAY_RESET } from '../../constants/orderConstants'
import axios from 'axios'

export const OrderScreen = ({ match }) => {
    const [sdkReady, setSdkReady] = useState(false)
    const orderId = match.params.id
    console.log(orderId);

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver


    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            }
            else {
                setSdkReady(true)
            }
        }


    }, [dispatch, match, orderId, order, successPay, userInfo, successDeliver])


    if (!loading && order) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        console.log('Paid SuccessFully ')
        dispatch(payOrder(orderId, paymentResult))
    }

    const markAsDelivererd = () => {
        dispatch(deliverOrder(order))
    }


    return (
        <>
            {loading ? <Loader /> : error ? (<Message variant='danger'>Error Occured While Placing Order</Message>) : (
                order && (
                    <Row>
                        <Col sm={9}>
                            <ListGroup variant='flush'>
                                {loadingDeliver && <Loader />}
                                <ListGroup.Item>
                                    <h2>Shipping Details</h2>
                                    <p>
                                        <strong>Name : {order.user.name}</strong>
                                    </p>
                                    <p>
                                        <strong>Email :</strong>
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Contact No.: {order.shippingAddress.mobileNo}</strong>
                                    </p>
                                    <strong>Address : </strong>
                                    <p>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.pincode},{order.shippingAddress.country}</p>
                                    {order.isDelivered ? <Message variant='success'>Delivered</Message> : <Message variant='danger'>Not Delivered</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Details</h2>
                                    <strong>Payment Mode : {order.paymentMethod}</strong>
                                    {order.isPaid ? <Message variant='success'>Payment Done</Message> : <Message variant='danger'>Payment Not Done</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Details</h2>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col sm={2}>
                                                    <Image src={`${item.image}`} alt='product Image' style={{ height: '50px' }} fluid rounded></Image>
                                                </Col>
                                                <Col sm={5}>
                                                    <Link to={`/product/${item.product}`} style={{ textAlign: 'center' }}>{item.name}</Link>
                                                </Col>
                                                <Col sm={5}>
                                                    {item.qty}x{item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={3}>
                            <h2>Order Summary</h2>
                            <Card>
                                <ListGroup>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col sm={6}>Items : </Col>
                                            <Col sm={6}>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col sm={6}>Shipping : </Col>
                                            <Col sm={6}>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col sm={6}>Total : </Col>
                                            <Col sm={6}>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? <Loader /> : (
                                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                            )}
                                        </ListGroup.Item>
                                    )}
                                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button className='btn btn-block' onClick={markAsDelivererd}>Mark as Delivered</Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                ))
            }
        </>
    )
}
