import express from 'express';
const router = express.Router();
import {getProduct, getProducts} from '../controllers/productControllers.js'

router.get('/', getProducts)


router.get('/:id', getProduct)

export default router