const express = require('express');
const ordersRouter = express.Router();
const { getCartByUserId, getOrdersByUserId, createCart, addToCart, getCartIdByUserId } = require('../db');
const { requireUser } = require('./utils');

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
        console.log("Here's your cart: ", cart)
        if(cart.length>0) {
            res.send(cart);
        } else {
            next({
            name: 'NotFound',
            message: `No cart for user_id ${req.params.user_id}`
        })
    }
    } catch (error) {
        next(error);
    }
});

// POST /api/orders/add2cart
ordersRouter.post('/add2cart', requireUser, async (req, res, next) => {
    try {
        const {user_id, product_id, qty} = req.body;
        let cartToUpdate = await getCartIdByUserId({user_id});
        if (cartToUpdate.length == 0){
            cartToUpdate = await createCart({user_id, isActive: true});
        }
        const cartLine = await addToCart({cart_id: cartToUpdate[0]["cart_id"], product_id: product_id, qty: qty})
        res.send(cartLine)
    } catch (error) {
        next(error);
    }
});

// Shouldn't need this anymore... :D 
// POST /api/orders/cart/create
// ordersRouter.post('/cart/create', requireUser, async (req, res, next) => {
//     try {
//         const cart = await createCart({user_id: req.user.id, isActive: true});
//         if(cart.id) {
//             res.send({cart_id: cart.id});
//         } else {
//              next({
//              name: 'CartError',
//              message: `Not able to create a cart for ${req.user.id}`
//             })
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// GET /api/orders/:user_id
ordersRouter.get('/:user_id', async (req, res, next) => {
    try {
        const orders = await getOrdersByUserId({user_id: req.params.user_id});
        if(orders.length>0) {
            res.send(orders);
        } else {
            next({
            name: 'NotFound',
            message: `No orders for user_id ${req.params.user_id}`
        })
    }
    } catch (error) {
        next(error);
    }
});

module.exports = ordersRouter;
