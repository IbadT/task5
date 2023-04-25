const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node');
const TodoMongodbControllers = require('../controllers/TodoMongodbControllers.js');

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




// mongoDB atlas







/**
 * @swagger
 * /api/mongodb/todo/:
 *   get:
 *     summary: Get all todos
 *     description: Return all todos from DB
 *     tags: [MongoDB todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Seccessfull response
 */


router.get('/', validation, async (req, res) => {
    try {

        const todos = await TodoMongodbControllers.getAllTodo();
        res.send(todos);

    } catch (error) {
        res.json(error);
        Sentry.captureException(error);
    }
})



/**
 * @swagger
 * /api/mongodb/todo/getById/{id}:
 *   get:
 *     summary: Get user with {id}
 *     tags: [MongoDB todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of todo
 *         type: string
 *     responses:
 *       '200':
 *         description: Successfull response
 */





router.get('/getById/:id', validation, async (req, res) => {
    try {

        const { id } = req.params;
        const todo = await TodoMongodbControllers.getTodoById(id);
        res.send(todo);

    } catch(error) {
        res.json(error);
        Sentry.captureException(error);
    }
})



/**
 * @swagger
 * /api/mongodb/todo/addTodo:
 *   post:
 *     summary: Create todo
 *     tags: [MongoDB todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             properties:
 *               title: 
 *                 type: string
 *     responses:
 *       '200':
 *         description: Seccess
 *       '403':
 *         description: Bad request
 */ 


router.post('/addTodo', validation, checkSchema(checkSch), async (req, res) => {
    try {

        const { body } = req;
        const addedTodo = await TodoMongodbControllers.addTodo(body);
        res.send(addedTodo);

    } catch (error) {
        res.json(error);
        Sentry.captureException(error);
    }
})








/**
 * @swagger
 * /api/mongodb/todo/editTodo/{id}:
 *  put:
 *      summary: Edites todo with {id}
 *      tags: [MongoDB todos]
 *      security:
 *        - bearerAuth: []
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

router.put('/editTodo/:id', validation, async (req, res) => {
    try {

        const { id } = req.params;
        const editedTodo = await TodoMongodbControllers.editTodo(id, req.body);
        editedTodo.data.modifiedCount 
            ? res.send(editedTodo.newObj) 
            : res.send('Todo is not defined')

    } catch(err) {
        res.json(error);
        Sentry.captureException(error);
    }
})


/**
 * @swagger
 * /api/mongodb/todo/updateTodo/{id}:
 *   patch:
 *     summary: Updates todo with {id}
 *     tags: [MongoDB todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Set an {id} of a module to update
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfull response
 *       '400':
 *         description: Todo is not defined
 */

router.patch('/updateTodo/:id', validation, async (req, res) => {
    try {

        const { id } = req.params;
        const { title } = req.body;
        const updatedTodo = await TodoMongodbControllers.updateTodo(id, title);
        res.send(updatedTodo);

    } catch(error) {
        res.json(error);
        Sentry.captureException(error);
    }
})


/**
 * @swagger
 * /api/mongodb/todo/deleteTodo/{id}:
 *   delete:
 *     summary: Delete module with {id}
 *     tags: [MongoDB todos]
 *     security:
 *       - bearerAuth: []
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

router.delete('/deleteTodo/:id', validation, async (req, res) => {
    try {

        const { id } = req.params;
        const bool = await TodoMongodbControllers.delete(id);
        bool ? res.send(true) : res.send(false);

    } catch (error) {
        res.json(error);
        Sentry.captureException(error);
    }
})

module.exports = router;