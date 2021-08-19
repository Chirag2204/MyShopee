import React, { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer, linkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { deleteUser, getUserList } from '../../actions/userActions'


export const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success } = userDelete

    const userList = useSelector(state => state.userList)
    const { loading, users, error } = userList
    console.log(users)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getUserList())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, success])

    const deleteHandler = (id) => {
        if (window.confirm('Are You Sure To Delete The User?')) {
            dispatch(deleteUser(id))
        }
        console.log('delete')
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>Cannot find Users</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr >
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>isAdmin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <i className='fas fa-check' style={{ color: "green" }}></i> : <i className='fas fa-times' style={{ color: "red" }}></i>}</td>
                                <td >
                                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => { deleteHandler(user._id) }}><i className='fas fa-trash'></i></Button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            )}
        </>
    )
}
