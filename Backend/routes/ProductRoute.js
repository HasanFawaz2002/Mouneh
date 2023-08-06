const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getMyProducts,getNewProduct,ReturnProductQuantity,updateProductQuantity } = require('../Controllers/ProductsController');

const router = Router();

router.put('/products/:userID/:productID', verify, updateProduct);
router.post('/products', verify, addProduct);
router.delete("/products/:userID/:productID", verify, deleteProduct);
router.get('/products/find/:productID', getProduct);
router.get('/products', getAllProduct);
router.get('/products/my-products', verify, getMyProducts); 
router.get('/newProduct',getNewProduct);
router.patch('/update-quantity/:productID', updateProductQuantity);
router.patch('/return-quantity/:productID', ReturnProductQuantity);



module.exports = router;
