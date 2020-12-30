import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'

import colors from 'colors';
import bodyParser from 'body-parser'

import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoutes.js'
import {notFound, errorHandler} from './middlewares/errorMiddlewares.js'


const app = express();

//Envoirement Variables
dotenv.config();

//Connection to DB
connectDB();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req,res,next)=>{
    console.log(req.originalUrl.white.underline);
    next()
});

app.get('/', (req, res)=> {
    res.send('Api is runnong')
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter)

//Error handlers middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on ${PORT} port`.yellow.bold))