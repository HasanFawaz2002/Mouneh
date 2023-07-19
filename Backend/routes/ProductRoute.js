const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { updateProduct } = require('../Controllers/ProductsController'); // Assuming updateProduct is a valid callback function

const router = Router();

router.put('/products/:id/:productID', verify, updateProduct);

module.exports = router;
