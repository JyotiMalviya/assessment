const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');


router.post('/register', userService.register);
router.post('/logIn', userService.login);

module.exports = router;
 



