import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data);
        }
        fetchProducts();
    }, [])

    return (
        <Row>{
            Products.map(product => (
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
        </Row>
    )
}

export default HomeScreen;