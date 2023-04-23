const express = require('express');
const router = express.Router();
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


// mongoDB atlas




/**
 * @swagger
 * /api/mongodb/todo/:
 *   get:
 *     summary: Get all todos
 *     description: Return all todos from DB
 *     tags: [MongoDB todos]
 *     responses:
 *       '200':
 *         description: Seccessfull response
 */

router.get('/', async (req, res) => {
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
 *    get:
 *      summary: Get user with {id}
 *      tags: [MongoDB todos]
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


router.post('/addTodo', checkSchema(checkSch), async (req, res) => {
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
 *  patch:
 *      summary: Updates todo with {id}
 *      tags: [MongoDB todos]
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
        const bool = await TodoMongodbControllers.delete(id);
        bool ? res.send(true) : res.send(false);

    } catch (error) {
        res.json(error);
        Sentry.captureException(error);
    }
})

module.exports = router;