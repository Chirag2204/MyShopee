import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [numOfReviews, setNumOfReviews] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate

    useEffect(() => {
        //debugger
        if (successUpdate) {
            history.push('/admin/productlist')
        } else {
            //productName undefined && isLoading undefined : dispatch
            //productName undefined && isLoading false : redirect to list

            if (!product?.name) {
                dispatch(listProductDetails(productId))
            }
            else if (!product?.name || product?._id !== productId) {
                history.push('/admin/productlist')
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
                setNumOfReviews(product.numOfReviews)
            }
        }
        //   return dispatch

    }, [dispatch, history, productId, product, successUpdate])

    useEffect(() => () => {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        dispatch({ type: PRODUCT_DETAILS_RESET })
    }, [dispatch])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, name, price, brand, image, category, description, countInStock, numOfReviews }))
    }

    const imageUploadHandler = async (e) => {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            console.log('test log')
            const { data } = await axios.post('/api/upload', formData, config)
            console.log(data)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.log(error)
            setUploading(false)
        }

    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light mb-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1 >Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variamt='danger'>Some Error Occured</Message>}
                {loading ? <Loader /> : error ? <Message varinat='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler} className='py-3'>
                        <Form.Group controlId='name' className='py-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Product Name'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='py-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='brand' className='py-3'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => { setBrand(e.target.value) }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image' className='py-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image URL'
                                value={image}
                                onChange={(e) => { setImage(e.target.value) }}>
                            </Form.Control>
                            <Form.File
                                id='image-file'
                                custom
                                onChange={imageUploadHandler}>
                            </Form.File>
                            {uploading && <Loader />}

                        </Form.Group>
                        <Form.Group controlId='category' className='py-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => { setCategory(e.target.value) }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='py-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock' className='py-3'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Count In Stock'
                                value={countInStock}
                                onChange={(e) => { setCountInStock(e.target.value) }}>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' onClick={submitHandler}>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default ProductEditScreen
