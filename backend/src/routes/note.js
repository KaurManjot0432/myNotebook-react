const express = require('express');
const router = express.Router();
const validator = require("../config/validator");
var fetchUser = require("../config/fetchUser");
const { createNote, getNotes, updateNotes, deleteNotes } = require('../controllers/noteController');


router.post('/createNote',fetchUser,validator.createNote, createNote);
router.get('/getNotes', fetchUser, getNotes);
router.patch('/updateNotes/:id', fetchUser, updateNotes);
router.delete('/deleteNote/:id', fetchUser, deleteNotes);

module.exports = router;