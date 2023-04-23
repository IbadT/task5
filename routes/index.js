const express = require('express');
const router = express.Router();

const todoMongooseRoutes = require('./todoMongooseRoutes.js');
router.use('/mongoose/todo', todoMongooseRoutes);

const todoMongodbRoutes = require('./todoMongodbRoutes.js');
router.use('/mongodb/todo', todoMongodbRoutes);

const authorization = require('./authorization.js');
router.use('/authorization', authorization);

module.exports = router;