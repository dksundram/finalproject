// backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/forgot-password', authService.forgotPassword);
router.post('/reset-password', authService.resetPassword);

module.exports = router;
