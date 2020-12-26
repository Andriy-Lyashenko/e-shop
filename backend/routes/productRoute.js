import express from 'express';
const router = express.Router();
import AsyncHandler from 'express-async-handler';

import Product from '../models/product.model.js'

router.get('/', AsyncHandler(async (req, res)=> {
    const products = await Product.find({})
    res.json(products)
}))


router.get('/:id', AsyncHandler(async (req, res)=> {
    const product = await Product.findById(req.params.id);

    if(product){
        res.json(product)
    }else{
        res.status(404)

        throw new Error('Product not found')
    }
}))

export default router