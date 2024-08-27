const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.get('/login', LoginController.index);
router.get('/register', LoginController.register);
router.post('/auth', LoginController.auth);
router.get('/logout', LoginController.logout);

module.exports = router;
