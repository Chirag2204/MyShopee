import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listProductDetails } from "../../actions/productActions";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "../Message";

function ProductScreen({ match }) {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    console.log(productDetails);
    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row style={{ marginBottom: "10px" }}>
                        <Col lg={2} md={2} sm={2}>
                            <LinkContainer to="/">
                                <Button >Go Back</Button>
                            </LinkContainer>
                        </Col>
                    </Row>
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
                                                <strong>{product.countInStock == 0 ? 'Out Of Stock' : 'In Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row>
                                                <Button className="btn btn-block" type="button" disabled={product.countInStock == 0}>Add To Cart</Button>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}

        </>
    );
}
export default ProductScreen;