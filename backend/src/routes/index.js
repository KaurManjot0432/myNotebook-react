const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const noteRouter = require('./note');

router.use('/api/users', userRouter);
router.use('/api/notes',noteRouter);

module.exports = router;