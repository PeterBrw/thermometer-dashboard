const express = require('express');

const controller = require('../controllers/dashboard');

const router = express.Router();

router.get('/dashboard', controller.getDashboard)

module.exports = router;