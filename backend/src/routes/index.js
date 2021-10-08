const express = require('express');
const router = express.Router();
const userRouter = require('./user');

router.use('/api/users', userRouter);

module.exports = router;