const express = require('express');

const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
  let error = req.flash('error');
  res.render("index",{error});
});

router.get('/shop', isLoggedin, async (req, res) => {
  let products = await productModel.find();
  res.render("shop", {products});
});

router.get('/cart', isLoggedin, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email}).populate('cart');
  res.render("cart", {user});
});

router.get('/add-to-cart/:productid', isLoggedin, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  res.redirect('/shop');
});

// router.get('/logout', isLoggedin, (req, res) => {
//   res.render("shop");
// });

module.exports = router;