const express = require('express');
const ordersRouter = express.Router();
const { getCartByUserId, getOrdersByUserId, createCart, addToCart, getCartIdByUserId, interpretCart, editCart, deleteCartLine, checkCode } = require('../db');
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
        console.log("Receiving: ", req.body)
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

// PATCH /api/orders/EditCart/
ordersRouter.patch('/EditCart', requireUser, async (req, res, next) => {
    try {
        const {user_id, product_id, qty} = req.body;
        let cartToUpdate = await getCartIdByUserId({user_id});
        const cartLine = await editCart({qty: qty, cart_id: cartToUpdate[0]["cart_id"], product_id: product_id })
        res.send(cartLine)
    } catch (error) {
        next(error);
    }
});

// DELETE /api/orders/EditCart/RemoveLine
ordersRouter.delete('/EditCart/RemoveLine', requireUser, async (req, res, next) => {
    try {
        const {user_id, product_id} = req.body;
        console.log(user_id, product_id)
        let cartToUpdate = await getCartIdByUserId({user_id});
        const cartLine = await deleteCartLine({cart_id: cartToUpdate[0]["cart_id"], product_id: product_id })
        res.send(cartLine)
    } catch (error) {
        next(error);
    }
});

// POST /api/orders/guest-cart
ordersRouter.post('/guest-cart', async (req, res, next) => {
    try {
        const {product_id} = req.body;
        let cart = await interpretCart({product_id});
        res.send(cart)
    } catch (error) {
        next(error);
    }
});

// GET /api/orders/guest-cart
ordersRouter.post('/promo', async (req, res, next) => {
    try {
        const {code} = req.body;
        let response = await checkCode({code});
        if (code == response[0]["code"]){
            res.send(response)
        } else {
            res.send("Error: ", [response[0]["code"]])
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
