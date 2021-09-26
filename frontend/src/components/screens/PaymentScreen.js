import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartActions'
import { CheckoutSteps } from '../CheckoutSteps'


export const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='Paypal Or Credit Card' id='Paypal' name='paymentMethod' value='Paypal' checked default onChange={(e) => {
                            setPaymentMethod(e.target.value)
                        }}></Form.Check>
                    </Col>
                    <Col>
                        <Form.Check type='radio' label='Cash On Delivery' id='CashOnDelivery' name='paymentMethod' value='Cash On Delivery' onChange={(e) => {
                            setPaymentMethod(e.target.value)
                        }}></Form.Check>
                    </Col>
                    <Button type='submit' variant='primary'>Continue</Button>
                </Form.Group>
            </Form>
        </div>
    )
}
