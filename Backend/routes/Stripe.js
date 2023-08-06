const { Router } = require('express');
const {HandleStripe}=require('../Controllers/Stripe');
const router = Router();

router.post('/create-checkout-session',HandleStripe);

module.exports = router;