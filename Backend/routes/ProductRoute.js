const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getMyProducts } = require('../Controllers/ProductsController');

const router = Router();

router.put('/products/:userID/:productID', verify, updateProduct);
router.post('/products', addProduct);
router.delete("/products/:userID/:productID", verify, deleteProduct);
router.get('/products/find/:productID', getProduct);
router.get('/products', verify, getAllProduct);
router.get('/products/my-products', verify, getMyProducts); // Add the "Get My Products" route

module.exports = router;
