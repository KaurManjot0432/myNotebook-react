const express = require('express');
const router = express.Router();
const validator = require("../config/validator");
var fetchUser = require("../config/fetchUser");
const { createNote, getNotes } = require('../controllers/noteController');


router.post('/createNote',fetchUser,validator.createNote, createNote);
router.get('/getNotes', fetchUser, getNotes);

module.exports = router;