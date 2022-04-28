const express = require('express');

const controller = require('../controllers/dashboard');

const router = express.Router();

router.get('/dashboard', controller.getDashboard)

router.post('/dashboard', controller.postDashboard)

module.exports = router;