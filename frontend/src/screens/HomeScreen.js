import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux' 
import {Row, Col} from 'react-bootstrap';
import {listProducts} from '../actions/productActions';

import Loader from '../components/Loader';
import Message from '../components/Message'


import Product from '../components/Product';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(({productList})=> productList);
    const {loading, products, error} = productList;

    useEffect(()=> {
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
          <h1>Latest Products</h1>
          {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
            <Row>
                {products.map(product=>{
                    return (
                        <Col sm={12} lg={4} xl={3} key={product._id}>
                            <Product product={product}/>
                        </Col>
                    )
                })}
            </Row>
          }
        </>
    )
}

export default HomeScreen
