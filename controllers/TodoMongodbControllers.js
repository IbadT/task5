const TodoMongodbServices = require('../services/TodoMongodbServices.js');

class TodoMongodbControllers {
    async getAllTodo() {
        let todos = await TodoMongodbServices.getAllTodo();
        return todos;
    };

    async getTodoById(id) {
        let todo = await TodoMongodbServices.getTodoById(id);
        return todo;
    };

    async addTodo(body) {
        let addedTodo = await TodoMongodbServices.addTodo(body);
        return addedTodo;
    };

    async editTodo(id, body) {
        let editedTodo = await TodoMongodbServices.editTodo(id, body);
        return editedTodo;
    };

    async updateTodo(id, title) {
        let updatedTodo = await TodoMongodbServices.updateTodo(id, title);
        return updatedTodo;
    };

    async delete(id) {
        let bool = await TodoMongodbServices.delete(id);
        return bool;
    };
}

module.exports = new TodoMongodbControllers();