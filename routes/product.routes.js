const express = require('express');
const { getProducts, newProduct } = require('../controllers/productControllers');
const router = express.Router();

router.route('/allproducts').get(getProducts);
router.route('/newproduct').post(newProduct)

module.exports = router;