import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingDetails } from '../../actions/cartActions'
import { CheckoutSteps } from '../CheckoutSteps'



export const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [pincode, setPincode] = useState(shippingAddress.pincode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [mobileNo, setMobileNo] = useState(shippingAddress.mobileNo)

    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(saveShippingDetails({ address, city, pincode, country, mobileNo }))
        history.push('/payment')
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <CheckoutSteps step1 step2 />
            <FormContainer>
                <Form onSubmit={submitHandler} className='py-3'>
                    <Form.Group controlId='address' className='py-3' >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => { setAddress(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city' className='py-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' placeholder='Enter City Name' value={city} onChange={(e) => { setCity(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='pincode' className='py-3'>
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control type='text' placeholder='Enter Pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='country' className='py-3'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e) => { setCountry(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='mobileNo' className='py-3'>
                        <Form.Label>Mobile No.</Form.Label>
                        <Form.Control type='tel' placeholder='Enter Mobile NNo.' value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Continue CheckOut</Button>
                </Form>
            </FormContainer>
        </>
    )
}
