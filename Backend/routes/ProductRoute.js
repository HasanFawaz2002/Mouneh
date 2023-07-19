const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { updateProduct} = require('../Controllers/ProductsController'); // Use destructuring to import the updateUser function

const router = Router();

router.put('/products/:id/productID', verify, updateUser);

module.exports = router;
