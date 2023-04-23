const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/AuthControllers.js');
const { checkSchema, validationResult } = require('express-validator');

const authSchema = {
    login: {
        isLength: {
            options: {min: 5},
            errorMessage: 'Login should be at least 5 chars'
        },
        errorMessage: 'Invalid username',
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password should be at least 8 chars',
      },
    },
  };





/**
 * @swagger
 * /api/authorization/login:
 *   post:
 *     summary: Login user
 *     description: Check token
 *     tags: [Authorization]
 *     requestBody:
 *       description: Input login and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:  
 *               login:
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       '200':
 *          description: Seccess
 *       '401':
 *          description: Bad request
 */

router.post('/login', checkSchema(authSchema), async (req, res) => {
    try {

        validationResult(req).throw();
        const { login, password } = req.body;
        const token = await AuthControllers.login(login, password);
        if(token == null) res.json({ message: 'invalid login' });
        res.send(token);

    } catch (error) {
        console.log(error);
    }
})


/**
 * @swagger
 * /api/authorization/register:
 *   post:
 *     summary: Register new user
 *     tags: [Authorization]
 *     requestBody:
 *       description: input login and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: user created
 *       '401':
 *         description: user doesn't created
 */


router.post('/register', checkSchema(authSchema), async (req, res) => {
    try {

        validationResult(req).throw();
        const { login, password } = req.body;
        const user = await AuthControllers.register(login, password);
        if(user == null) res.json({ message: 'this login is already in use'});
        res.send(user);

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkliYWRUb2ZmIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2ODIwMjY1NzV9.ZTNdv_oZFTgOPJyENgE7Din4RXXuIP4bbLGDkbjp6bk


// {
//     "login": "IbadToff",
//     "password": "123456"
// }


// {
//     "login": "IbadToff",
//     "password": "$2b$10$upBu0GpAN1P2s8c3HES20uBUJ8PJxbqPrmBsC4zVI3k.sFmDoBpba",
//     "_id": "6441aff36bff7d9d9ac8236a"
// }