import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import Message from '../Message'
import Loader from '../Loader'

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

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user?.name) {
                dispatch(getUserDetails('profile'))
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
            <Col md={4}>
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
            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
        </Row >
    )
}

export default ProfileScreen
