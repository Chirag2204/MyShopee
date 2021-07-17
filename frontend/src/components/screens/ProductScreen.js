import React from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import products from "../products"
import Rating from "../Rating";

function ProductScreen({ match }) {
    const product = products.find((p) => p.id === match.params.id);
    return (
        <>
            <Row>
                <Col md={4} style={{ textAlign: "center", marginTop: 0 }}>
                    <Image src={product.image} fluid />
                </Col>
                <Col md={5}>
                    <ListGroup.Item variant="flush">
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item variant="flush">
                        <Rating rating={product.rating} text={product.numofreviews} />
                    </ListGroup.Item>
                    <ListGroup.Item variant="flush">
                        Price : ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item variant="flush">
                        <h5>Specifications :</h5>
                        {product.description}
                    </ListGroup.Item>
                </Col>
                <Col md={3}>
                    <Card variant="flush">
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={5}>
                                        Price
                                    </Col>
                                    <Col md={7}>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={5}>
                                        Status
                                    </Col>
                                    <Col md={7}>
                                        <strong>{product.countInStocks === "0" ? 'Out Of Stock' : 'In Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Button className="btn btn-block" type="button" disabled={product.countInStocks === "0"}>Add To Cart</Button>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
export default ProductScreen;