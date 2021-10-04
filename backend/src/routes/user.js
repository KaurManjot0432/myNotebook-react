const express = require('express');
const router = express.Router();
const {create} = require('../controllers/userController');
const validator = require("../config/validator");


router.post('/create',validator.createUser,create);

module.exports = router;