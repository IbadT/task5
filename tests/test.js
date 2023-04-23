require('dotenv').config();
const request = require('supertest');
const app = require('../server.js');
const dateObj = require('../helpers/date.js');


describe('Endpoint\'s tests', () => {
    
    let allTodos = null;
    let createdTodo = null;

    beforeAll(async () => {
        allTodos = await request(app)
            .get('/api/mongoose/todo')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
    })
    
    it('should return all todos', async () => {
        const response = await request(app)
            .get('/api/mongoose/todo')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
        expect(response.body).toEqual(allTodos.body)
    });

    it('should return new todo', async () => {
        const response = await request(app)
            .post('/api/mongoose/todo/addTodo')
            .send({title: 'test todo for test'})
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
        expect(response.body).toEqual({
            _id: response.body._id,
            isCompleted: false,
            time: dateObj.time,
            date: dateObj.date,
            title: 'test todo for test'
        })
        createdTodo = response.body;
    });

    it('should return todo by id', async () => {
        const response = await request(app)
            .get('/api/mongoose/todo/getById/'+createdTodo._id)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
        expect(response.status).toBe(200)
        expect(response.body).toEqual([{...createdTodo, "__v": 0}])
    })

    it('should return edited todo', async () => {
        const response = await request(app)
            .put('/api/mongoose/todo/editTodo/'+createdTodo._id)
            .send({title: 'put title test'})
            .set('Accept', 'application/json')
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('put title test')
    })

    it('should return changed isCompleted with todo', async () => {
        const response = await request(app)
            .patch('/api/mongoose/todo/changeCompleted/'+createdTodo._id)
            .send({isCompleted: !createdTodo.isCompleted})
            .set('Accept', 'application/json')
        expect(response.body.isCompleted).toBe(!createdTodo.isCompleted)
    })

    
    it('should return delete result', async () => {
        const response = await request(app)
            .delete('/api/mongoose/todo/deleteTodo/'+createdTodo._id)
            .set('Accept', 'application/json')
        expect(response.status).toBe(200)
    })
})