const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { registerForWorkshop, fetchUserWorkshops } = require('../Controllers/userworkshopcontrollers');

const router = Router();

// Register user for a workshop
router.post('/registeruserworkshop/:id', verify, registerForWorkshop);

// Fetch workshops registered by the user
router.get('/userworkshops', verify, fetchUserWorkshops);

module.exports = router;
