import React, { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { deleteProduct, listProduct, createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import { Meta } from '../Meta'
import { Paginate } from '../Paginate'


export const ProductListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { loading, products, page, pages, error } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, success: successCreate, product: createdProduct, error: errorCreate } = productCreate

    useEffect(() => {


        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {

            history.push(`/admin/products/${createdProduct._id}}/edit`)
        } else {
            dispatch(listProduct('', pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    useEffect(() => () => {
        dispatch({ type: PRODUCT_CREATE_RESET })
    }, [])

    const deleteHandler = (id) => {
        if (window.confirm('Are You Sure To Delete The Product?')) {
            dispatch(deleteProduct(id))
        }
        console.log('delete')
    }

    const createHandler = (product) => {
        dispatch(createProduct())
        console.log('create Product')
    }

    return (
        <>
            <Meta title='Admin Screen' />
            <Row className='mb-3'>
                <Col sm={9}>
                    <h1>Products</h1>
                </Col>
                <Col sm={3}>
                    <Button className='btn btn-primary' onClick={(e) => createHandler()}>
                        <i className='fas fa-plus'> Create Product</i>
                    </Button>
                </Col>
            </Row>
            {errorDelete && <Message variant='danger'>Some Error Occured While Deleting Product!</Message>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>Cannot find Products</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr >
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => { deleteHandler(product._id) }}><i className='fas fa-trash'></i></Button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} products={products} isAdmin={true} />
                </>
            )
            }
        </>
    )
}
