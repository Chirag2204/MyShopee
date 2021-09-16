import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../actions/productActions'

export const ProductCarousel = () => {
    const dispatch = useDispatch()
    const topProducts = useSelector(state => state.topProducts)
    const { products, loading, error } = topProducts
    console.log(topProducts)

    useEffect(() => {
        dispatch(getTopProducts())
    }, [dispatch])

    return (
        <div className='carousel'>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Carousel fade pause='hover' className='bg-dark'>
                    {products?.map((product) => (
                        <Carousel.Item key={product._id} interval={2000}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid></Image>
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name}(<strong>${product.price}</strong>)</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    )
}
