import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from "../../actions/productActions";
import Message from "../Message";
import Loader from "../Loader";

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    console.log(productList);
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProduct());
    }, [dispatch])

    return (
        <>
            <h2>Latest Products</h2>
            {loading ? <Loader /> : error ? <Message variant='success' children={error} /> :
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
                                numofreviews={product.numofreviews} />
                        </Col>
                    ))
                    }
                </Row>}
        </>
    )
}

export default HomeScreen;