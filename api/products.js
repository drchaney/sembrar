const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getAllProductsByCategory, getAllCategories, getFeaturedProducts, getFeaturedProductsByCategory, getProductsByTag, getProductById, getIdFromFeaturedProducts } = require('../db');

// GET /api/products/
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (error) {
        next(error)
    }
})

// GET /api/products/featured
productsRouter.get('/featured', async (req, res, next) => {
    try {
        const products = await getFeaturedProducts();
        res.send(products);
    } catch (error) {
        next(error)
    }
})

// GET /api/products/featuredIDs
productsRouter.get('/featuredIDs', async (req, res, next) => {
    try {
        const products = await getIdFromFeaturedProducts();
        res.send(products);
    } catch (error) {
        next(error)
    }
})

// GET /api/products/featured/:category
productsRouter.get('/featured/:category', async (req, res, next) => {
    try {
        const products = await getFeaturedProductsByCategory({category: req.params.category});
        if(products.length>0) {
            res.send(products);
        } else {
            next({
            name: 'NotFound',
            message: `No featured products have a category of ${req.params.category}`
            })
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/products/featured/tag/:tag
productsRouter.get('/featured/tag/:tag', async (req, res, next) => {
    try {
        const products = await getProductsByTag({tag: req.params.tag});
        if(products.length>0) {
            res.send(products);
        } else {
            next({
            name: 'NotFound',
            message: `No products have a tag of ${req.params.tag}`
            })
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/products/category
productsRouter.get('/category', async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.send(categories);
    } catch (error) {
        next(error)
    }
})

// GET /api/products/category/:category
productsRouter.get('/category/:category', async (req, res, next) => {
    try {
        const products = await getAllProductsByCategory({category: req.params.category});
        if(products.length>0) {
            res.send(products);
        } else {
            next({
            name: 'NotFound',
            message: `No products have a category of ${req.params.category}`
        })
    }
    } catch (error) {
        next(error);
    }
});

// GET /api/products/item/:id
productsRouter.get('/item/:id', async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        if(product.length>0) {
            res.send(product);
        } else {
            next({
            name: 'NotFound',
            message: `No item has an id of ${req.params.id}`
            })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = productsRouter;
