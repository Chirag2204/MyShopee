import React, { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Button, FormControl, Form } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { createProductReview, listProductDetails } from "../../actions/productActions";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "../Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import { Meta } from "../Meta";

function ProductScreen({ history, match }) {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingReview, success: successReview, error: errorReview } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (successReview) {
            alert('Review Added Successfully!')
            setRating('0')
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        if (errorReview) {
            alert('A user can review a product for once Only')
            setRating('0')
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successReview, errorReview])

    const addtoCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const submitHandler = () => {
        dispatch(createProductReview(match.params.id, {
            rating, comment
        }))
    }

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Meta title={product.name} />
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
                                <Rating rating={product.rating} text={product.numOfReviews} />
                                {product.numOfReviews} reviews
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
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <FormControl as='select' value={qty} onChange={(event) => setQty(event.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }

                                                    </FormControl>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                    )}
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row>
                                                <Button className="btn btn-block" type="button" onClick={addtoCartHandler} disabled={product.countInStock == 0}>Add To Cart</Button>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>


                            <h2>Reviews</h2>
                            {product.reviews?.length === 0 && <Message>No reviews Yet</Message>}
                            <ListGroup varinat='flush'>
                                <ListGroup.Item>
                                    <h2>Write A Customer Review</h2>
                                    {console.log(errorReview)}
                                    {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={(e) => { setRating(e.target.value) }}>
                                                    <option value=''>Select..</option>
                                                    <option value='1'>1-Poor</option>
                                                    <option value='2'>2-Average</option>
                                                    <option value='3'>3-Good</option>
                                                    <option value='4'>4-Very Good</option>
                                                    <option value='5'>5-Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='4' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Button className='btn btn-seconadary my-3' type='submit' onSubmit={submitHandler}>Post Review</Button>
                                        </Form>
                                    ) : <Message><Link to='/login'>Log In</Link> to post a Review</Message>}
                                </ListGroup.Item>
                                {
                                    product.reviews?.map(review => (
                                        <ListGroup.Item key={review.id}>
                                            <strong>{review.name}</strong>
                                            <Rating rating={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}

        </>
    );
}
export default ProductScreen;