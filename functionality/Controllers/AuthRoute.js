const {Router} = require('express');
const {registerUser, loginUser} = require("./AuthController");

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;