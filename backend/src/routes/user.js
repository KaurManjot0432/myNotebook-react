const express = require('express');
const router = express.Router();
const {create, signin, getProfile} = require('../controllers/userController');
const validator = require("../config/validator");
var fetchUser = require("../config/fetchUser");


router.post('/create',validator.createUser,create);
router.post('/signin',validator.signin, signin);
router.get('/profile',fetchUser,getProfile);

module.exports = router;