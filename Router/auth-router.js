const express = require('express');
const router = express.Router();
const { home, register, login, user } = require('../controller/auth-controller');
const validate = require('../Middlewares/validate-middleware');
const registerSchema = require('../validators/auth-validator');
const authmiddleware = require('../Middlewares/auth-middleware');

router.get('/', home);

router.post('/register', validate(registerSchema), register);

router.post('/login', login);

router.route('/user').get(authmiddleware , user);

module.exports = router;
