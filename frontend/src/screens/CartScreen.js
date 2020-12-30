import React, {useEffect} from 'react';
import Message from '../components/Message';

import {addToCart, deleteFromCart} from '../actions//cartActions'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {Row, Col, ListGroup, Image, Form, Button, Card, FormControl} from 'react-bootstrap';

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    console.log(cartItems)

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, qty, productId]);

    const removeCartHandler = (id) => {
        dispatch(deleteFromCart(id))
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    const subtotal = cartItems.reduce((accum,value)=>{
        return accum + value.qty
    }, 0);
    const totalPrice = cartItems.reduce((accum,value)=>{
        return accum + value.qty * value.price
    }, 0);

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your Cart is Empty <Link to='/'>Go Back</Link> </Message> : 
                    <ListGroup variant='flush'>
                        {cartItems.map(item=>{
                            return (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image fluid rounded src={item.image} alt={item.name}/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            {item.price}
                                        </Col>
                                        <Col md={2}>
                                            <FormControl
                                                as='select'
                                                value={item.qty}
                                                onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {[...Array(Number(item.countInStock)).keys()].map((x)=>{
                                                    return (
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    )
                                                })}
                                            </FormControl>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='dark'
                                            onClick={()=> removeCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                }
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal {subtotal}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Total Price {parseInt(totalPrice)}$</h3>
                    </ListGroup.Item>
                    {cartItems.length !== 0 && (
                        <Button onClick={checkoutHandler} type='button' variant='dark'>
                            Proceed to checkout
                        </Button>
                    )}
                </ListGroup>
            </Col>
            <Col md={2}>
            </Col>
        </Row>
    )
}

export default CartScreen
