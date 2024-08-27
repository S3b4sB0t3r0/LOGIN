// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');

router.get('/', ProfileController.profile);

module.exports = router;
