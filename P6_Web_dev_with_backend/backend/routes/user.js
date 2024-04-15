const express = require('express');
const router = express.Router();

//import middleware / email
const validEmail = require("../middleware/email");

// importat middleware / password
const password = require("../middleware/password");

// import controllers / user
const userCtrl = require("../controllers/user");

router.post('/signup', password, validEmail, userCtrl.singup);
router.post('/login', userCtrl.login);

module.exports = router;