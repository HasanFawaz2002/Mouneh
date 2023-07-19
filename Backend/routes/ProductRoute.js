const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addProduct,updateProduct,deleteProduct,getProduct,getAllProduct} = require('../Controllers/ProductsController'); // Use destructuring to import the updateUser function

const router = Router();

router.put('/products/:id/:productID', verify, updateProduct);
router.post('/products/:userID',addProduct)
router.delete("/products/:id/:productID",verify,deleteProduct)
router.get('/products/find/:id', getProduct );
router.get('/products', verify, getAllProduct );



module.exports = router;
