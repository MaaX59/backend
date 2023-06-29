const express = require('express');
const { getProducts } = require('../models/controllers/productControllers');
const router = express.Router();

router.route('/allproducts').get(getProducts)

module.exports = router;