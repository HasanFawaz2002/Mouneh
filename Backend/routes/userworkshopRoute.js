const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { registerForWorkshop, fetchUserWorkshops,getAllUserWorkshops,isRegisteredInWorkshop } = require('../Controllers/userworkshopcontrollers');

const router = Router();

// Register user for a workshop
router.post('/registeruserworkshop/:workshopID', verify, registerForWorkshop);

// Fetch workshops registered by the user
router.get('/userworkshops', verify, fetchUserWorkshops);
router.get('/getuserworkhsops/:userId', verify, getAllUserWorkshops);
router.get('/isregistered/:userId/:workshopId', verify, isRegisteredInWorkshop);

module.exports = router;
