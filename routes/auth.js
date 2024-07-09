const express = require('express');
const { register, login, getDashboard } = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authMiddleware, getDashboard);

module.exports = router;
