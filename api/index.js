const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { getUserById } = require('../db')
const client = require('../db/client');
const JWT_SECRET = process.env.JWT_SECRET
const twoCents = {
    health: "Healthy because it's a 2 instead of a 5",
    uptime: process.uptime(),
    message: "Doing excellent",
    date: new Date()
}

router.get('/health', async (req, res, next) => {
    res.status(200).send(twoCents)
});


router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
    
        try {
            const parsedToken = jwt.verify(token, JWT_SECRET);   
            console.log ("parsedToken: ", parsedToken)
        
            const id = parsedToken && parsedToken.id
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch (error) {
            next(error);
        }

    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

router.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }
    next();
});


const productsRouter = require('./products');
router.use('/products', productsRouter);

const adminRouter = require('./admin');
router.use('/admin', adminRouter);

const ordersRouter = require('./orders');
router.use('/orders', ordersRouter);

const usersRouter = require('./users');
router.use('/users', usersRouter);

module.exports = router;