import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from "../../actions/productActions";
import { Paginate } from "../Paginate";
import Message from "../Message";
import Loader from "../Loader";
import { ProductCarousel } from "../ProductCarousel";
import { Meta } from "../Meta";

function HomeScreen({ match }) {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProduct(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <Meta title='MyShopee' />
            {!keyword && <ProductCarousel />}
            <h2>Latest Products</h2>
            {loading ? <Loader /> : error ? <Message variant='success' children={error} /> : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col sm={12} md={6} lg={4} >
                                <ProductCard
                                    key={product._id}
                                    _id={product._id}
                                    name={product.name}
                                    brand={product.brand}
                                    image={product.image}
                                    description={product.desciption}
                                    price={product.price}
                                    rating={product.rating}
                                    numOfReviews={product.numOfReviews} />
                            </Col>
                        ))
                        }
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
                </>
            )
            }
        </>
    )
}

export default HomeScreen;