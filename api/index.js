const express = require('express');
const router = express.Router();
const twoCents = {
  health: "Healthy because it's a 2 instead of a 5",
  uptime: process.uptime(),
  message: "Doing excellent",
  date: new Date()
  }
  
router.get('/health', async (req, res, next) => {
  res.status(200).send(twoCents)
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