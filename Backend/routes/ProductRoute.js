const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getMyProducts,getNewProduct,ReturnProductQuantity,updateProductQuantity,getAllCategory,upload,getProductPhoto } = require('../Controllers/ProductsController');

const router = Router();


router.put('/products/:userID/:productID', upload.single("imagePath") , updateProduct);
router.post('/products', upload.single("imagePath"),verify, addProduct);
router.delete("/products/:userID/:productID", verify, deleteProduct);
router.get('/products/find/:productID', getProduct);
router.get('/products', getAllProduct);
router.get('/products/my-products', verify, getMyProducts); 
router.get('/newProduct',getNewProduct);
router.patch('/update-quantity/:productID', updateProductQuantity);
router.patch('/return-quantity/:productID', ReturnProductQuantity);
router.get("/categories", getAllCategory);
router.get("/products/:productID/photo", getProductPhoto);



module.exports = router;
