const TodoMongooseServices = require('../services/TodoMongooseServices');

class TodoMongooseControllers {
    async getAllTodo() {
        let todos = await TodoMongooseServices.getAllTodo();
        return todos;
    };

    async getTodoById(id) {
        let todo = await TodoMongooseServices.getTodoById(id);
        return todo;
    };

    async addTodo(body) {
        let addedTodo = await TodoMongooseServices.addTodo(body);
        return addedTodo;
    };

    async editTodo(id, body) {
        let editedTodo = await TodoMongooseServices.editTodo(id, body);
        return editedTodo;
    };

    async updateTodo(id, title) {
        let updatedTodo = await TodoMongooseServices.updateTodo(id, title);
        return updatedTodo;
    };

    async changeCompleted(id, isCompleted) {
        let changeResult = await TodoMongooseServices.changeCompleted(id, isCompleted);
        return changeResult;
    }

    async delete(id) {
        let bool = await TodoMongooseServices.delete(id);
        return bool;
    };
}

module.exports = new TodoMongooseControllers();