import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import { CheckoutSteps } from '../CheckoutSteps'
import { createOrder } from '../../actions/orderActions'

export const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 20

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice

    const orderCreate = useSelector(state => state.orderCreate)
    console.log(orderCreate)
    const { order, success, error } = orderCreate


    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [success, order, history])

    // useEffect(() => () => {
    //     dispatch({ type: ORDER_CREATE_REQUEST })
    //     console.log('unmount')
    // }, [])

    const submitHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))
    }


    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            {error && (<Message variant='danger'>Error Occured While Placing Order</Message>)}
            <Row>
                <Col sm={9}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Shipping Details</h2>
                            <strong>Address : </strong>
                            <p>{cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.pinCode},{cart.shippingAddress.country}</p>
                            <strong>Contact No.: {cart.shippingAddress.mobileNo}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Details</h2>
                            <strong>Payment Mode : {cart.paymentMethod}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Details</h2>
                            {cart.cartItems.map((item, index) => (
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
                        <ListGroup >

                            <ListGroup.Item>
                                <Row>
                                    <Col sm={6}>Items : </Col>
                                    <Col sm={6}>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col sm={6}>Shipping : </Col>
                                    <Col sm={6}>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col sm={6}>Total : </Col>
                                    <Col sm={6}>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <Button type='button' variant='primary' className='btn btn-block  my-3' onClick={submitHandler}>Place Order</Button>
                    </Card>

                </Col>
            </Row>
        </>
    )
}