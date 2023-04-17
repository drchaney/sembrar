const express = require('express');
const adminRouter = express.Router();
const { getArticlesByType } = require('../db');

// GET /api/admin/:article_type
adminRouter.get('/:article_type', async (req, res, next) => {
    try {
        const articles = await getArticlesByType({article_type: req.params.article_type});
        if(articles.length>0) {
            res.send(articles);
        } else {
            res.send({
            name: 'NotFound',
            message: `No articles have a category of ${req.params.article_type}`
            })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = adminRouter;
