import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import {useDispatch, useSelector} from 'react-redux';
import {listProductDetails} from '../actions/productActions'


import {Row, Col, Image, ListGroup, Card, Button, FormControl} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({history, match}) => {
    const [quantity, setQuantity]  = useState(1)
    const dispatch = useDispatch();
    const productDetails = useSelector(({productDetails})=> productDetails);
    const {loading, error, product} = productDetails

    useEffect(()=> {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match]);

    const addToCardHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    return (
        <>
           {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
           
           <div>
                <Link className='btn btn-dark my-3' to='/'>
                    Go back
                </Link>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out in stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <FormControl
                                                 as='select'
                                                 value={quantity}
                                                 onChange={(e)=> setQuantity(e.target.value)}
                                                >
                                                    {[...Array(Number(product.countInStock)).keys()].map((x)=>{
                                                        return (
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        )
                                                    })}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button
                                     className='btn-block'
                                     type='button'
                                     disabled={product.countInStock == 0}
                                     onClick={addToCardHandler}
                                     >
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
           </div>
           }
        </>
    )
}

export default ProductScreen
