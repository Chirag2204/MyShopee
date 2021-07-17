import React from "react";
import Products from "../products";
import ProductCard from "../ProductCard";
import { Row, Col } from "react-bootstrap";

function HomeScreen() {
    return (
        <Row>{
            Products.map(product => (
                <Col sm={12} md={6} lg={4} >
                    <ProductCard
                        key={product.id}
                        _id={product.id}
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