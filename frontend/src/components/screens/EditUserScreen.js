import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, register, updateUser } from '../../actions/userActions'
import Message from '../Message'
import Loader from '../Loader'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import { Meta } from '../Meta'

const EditUserScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })

            history.push('/admin/userlist')
        } else {
            if (!user?.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, userId, successUpdate])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }
    return (
        <>
            <Meta title='Admin Screen' />
            <Link to='/admin/userlist' className='btn btn-light mb-3'>
                Go Back
            </Link>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <FormContainer>
                <h1 >Edit User</h1>
                {loading ? <Loader /> : error ? <Message varinat='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className='py-3'>
                        <Form.Group controlId='name' className='py-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Your Name' value={name} onChange={(e) => { setName(e.target.value) }}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' className='py-3'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                        </Form.Group>
                        <Button type='submit' variant='primary' onClick={submitHandler}>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default EditUserScreen
