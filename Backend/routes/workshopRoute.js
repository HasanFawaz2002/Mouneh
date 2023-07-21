const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addWorkshop,updateWorkshop,deleteWorkshop,getAllWorkshops} = require('../Controllers/workshopcontrollers'); // Use destructuring to import the updateUser function

const router = Router();

router.put('/workshopupdate/:id', verify, updateWorkshop);
router.delete('/delete/:id', verify, deleteWorkshop);

router.get('/allworkshop', verify, getAllWorkshops );
router.post('/workshop', verify, addWorkshop);

module.exports = router;