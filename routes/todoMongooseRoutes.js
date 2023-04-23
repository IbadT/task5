require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node');
const TodoMongooseControllers = require('../controllers/TodoMongooseControllers.js');
const { checkSchema, validationResult } = require('express-validator');

const checkSch = {
    title: {
        trim: true,
        custom: {
            options: title => !!title 
        },
        errorMessage: 'Invalid title',
        isLength: {
            options: { min: 3 },
            errorMessage: 'Password should be at least 8 chars',
        }
    }
}



// mongoose


function validation(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        const token = authToken && authToken.split(' ')[1];
        if(token === null) res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if(err) throw new Error('invalid token');
            req.user = data;
            next();
        })
    } catch (error) {
        res.json(error);
        res.sendStatus(403);
    }
}


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 */


// {
//     "login": "ibadt",
//     "password": "12345678"
//   }




/**
 * @swagger
 * /api/mongoose/todo/:
 *   get:
 *     summary: Get all todos
 *     description: Return all todos from DB
 *     tags: [Mongoose todos]
 *     security: 
 *       - basicAuth: []
 *     responses:
 *       '200':
 *         description: Seccessfull response
 */

router.get('/', validation, async (req, res) => {
    try {

        const todos = await TodoMongooseControllers.getAllTodo();
        res.send(todos);

    } catch (error) {
        res.json(error);
        Sentry.captureException(error);
    }
})


/**
 * @swagger
 * /api/mongoose/todo/getById/{id}:
 *    get:
 *      summary: Get user with {id}
 *      tags: [Mongoose todos]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: id of todo
 *          type: string
 *      responses:
 *          '200':
 *              description: Successfull response
 */

router.get('/getById/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const todo = await TodoMongooseControllers.getTodoById(id);
        res.send(todo);        

    } catch(error) {
        res.json(err);
        Sentry.captureException(error);
    }
})



/**
 * @swagger
 * /api/mongoose/todo/addTodo:
 *   post:
 *     summary: Create Todo
 *     tags: [Mongoose todos]
 *     requestBody:
 *       description: A JSON object containing pet information
 *       required: true
 *       content:
 *         application/json:    
 *           schema:
 *             type: object
 *             properties:  
 *               title:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Seccess
 *       '403':
 *         description: Bad Request
 */

router.post('/addTodo', checkSchema(checkSch), async (req, res) => {
        try {

            validationResult(req).throw();
            const { body } = req;
            const addedTodo = await TodoMongooseControllers.addTodo(body);
            res.send(addedTodo);

        } catch (error) {
            res.json(error);
            Sentry.captureException(error);
        }
})


/**
 * @swagger
 * /api/mongoose/todo/editTodo/{id}:
 *  put:
 *      summary: Edites todo with {id}
 *      tags: [Mongoose todos]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Set an {id} of a module to update
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                title:
 *                  type: string
 *      responses:
 *          '200':
 *            description: Successfull response
 *          '400':
 *            description: Todo is not defined
 */

router.put('/editTodo/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const editedTodo = await TodoMongooseControllers.editTodo(id, req.body);
        res.send(editedTodo);

    } catch(error) {
        res.json(err);
        Sentry.captureException(error);
    }
})


/**
 * @swagger
 * /api/mongoose/todo/updateTodo/{id}:
 *  patch:
 *      summary: Updates todo with {id}
 *      tags: [Mongoose todos]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Set an {id} of a module to update
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                title:
 *                  type: string
 *      responses:
 *          '200':
 *            description: Successfull response
 *          '400':
 *            description: Todo is not defined
 */

router.patch('/updateTodo/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const { title } = req.body;
        const updatedTodo = await TodoMongooseControllers.updateTodo(id, title);
        res.send(updatedTodo);

    } catch(error) {
        res.json(error);
        Sentry.captureException(error);
    }
})


/**
 * @swagger
 * /api/mongoose/todo/changeCompleted/{id}:
 *   patch:
 *     summary: Change completed todo
 *     tags: [Mongoose todos]
 *     parameters:
 *       - in: path     
 *         name: id
 *         required: true
 *         description: id of chenged todo
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Seccess
 *       '400':
 *         description: Bad request
 */

router.patch('/changeCompleted/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isCompleted } = req.body;
        const changeResuls = await TodoMongooseControllers.changeCompleted(id, isCompleted);
        res.send(changeResuls);
    } catch(error) {
        res.json(error);
        Sentry.captureException(error);
    }
})


/**
 * @swagger
 * /api/mongoose/todo/deleteTodo/{id}:
 *   delete:
 *     summary: Delete module with {id}
 *     tags: [Mongoose todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of todo to delete
 *         type: string
 *     responses:
 *         '200':
 *             description: Successfull response
 */

router.delete('/deleteTodo/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const bool = await TodoMongooseControllers.delete(id);
        res.send(bool);        

    } catch (error) {
        res.json(error);
        Sentry.captureException(error);
    }
})

module.exports = router;