import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../Message'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import { Meta } from '../Meta'

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    const Qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, Qty))
        }
    }, [dispatch, productId, Qty])

    const removeFromCartHandler = (id) => {
        console.log('Item Removed')
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Meta title='Cart' />
            {cartItems.length === 0 ? (<Message>Your Cart is Empty <Link to='/' variant='warning'>Shop Here</Link> </Message>) : (
                <Row>
                    <Col md={8}>
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded style={{ width: '50px', height: '70px' }}></Image>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <FormControl as='select' value={item.qty} onChange={(event) => dispatch(addToCart(item.product, Number(event.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </FormControl>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' className='btn-block' variant='light' onClick={(e) => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <h3>SubTotal {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items </h3>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <p>SubTotal Amount :  ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</p>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button type='button' className='btn-block' onClick={checkOutHandler}>Proceed To CheckOut</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )
            }
        </Row >
    )
}

export default CartScreen;