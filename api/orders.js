const express = require('express');
const ordersRouter = express.Router();
const { getCartByUserId, getOrdersByUserId } = require('../db');

// GET /api/orders/
ordersRouter.get('/', async (req, res, next) => {
    try {
        res.send({
            name: 'OrdersRouteSuccessful',
            message: '/api/orders/ is working correctly'});
    } catch (error) {
        next(error)
    }
})

// GET /api/orders/cart/:user_id
ordersRouter.get('/cart/:user_id', async (req, res, next) => {
    try {
        const cart = await getCartByUserId({user_id: req.params.user_id});
        if(cart.length>0) {
            res.send(cart);
        } else {
            res.send({
            name: 'NotFound',
            message: `No cart for user_id ${req.req.params.user_id}`
        })
    }
    } catch (error) {
        next(error);
    }
});

// GET /api/orders/:user_id
ordersRouter.get('/:user_id', async (req, res, next) => {
    try {
        const orders = await getOrdersByUserId({user_id: req.params.user_id});
        if(orders.length>0) {
            res.send(orders);
        } else {
            res.send({
            name: 'NotFound',
            message: `No orders for user_id ${req.req.params.user_id}`
        })
    }
    } catch (error) {
        next(error);
    }
});

module.exports = ordersRouter;
