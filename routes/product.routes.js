const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');
const router = express.Router();

router.route('/allproducts').get(getProducts);
router.route('/newproduct').post(newProduct);
router.route('/:id').get(getSingleProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

module.exports = router;