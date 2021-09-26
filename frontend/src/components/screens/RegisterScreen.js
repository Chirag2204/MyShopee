import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import Message from '../Message'
import Loader from '../Loader'
import { Meta } from '../Meta'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }

    }, [userInfo, redirect, history])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(password + "," + confirmPassword);
        if (password !== confirmPassword) {
            setMessage('Passwords Do Not match')
        } else {
            dispatch(register(name, email, password));
        }
        //Dispatch Login
    }
    return (
        <FormContainer>
            <Meta title='Register' />
            <h1 >Register</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
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
                <Button type='submit' variant='primary' onClick={submitHandler}>Register</Button>
            </Form>
            <p>Already Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></p>
        </FormContainer>
    )
}

export default RegisterScreen
