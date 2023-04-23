const { ObjectId } = require('mongodb');
const dateObj = require('../helpers/date.js');
const Todo = require('../models/models.js');

class TodoMongooseServices {
    getAllTodo() {
        return new Promise((res, rej) => {

            Todo.find({}).then(data => res(data));

        });
    };

    getTodoById(id) {
        return new Promise((res, rej) => {

            Todo.find({_id: id}).then(data => res(data));

        });
    };

    addTodo(body) {
        return new Promise((res, rej) => {

            const { date, time } = dateObj;
            const data = new Todo({...body, date, time});
            data.save();
            res(data);

        });
    };

    editTodo(id, body) {
        return new Promise((res, rej) => {

            const { date, time } = dateObj;
            const newObj = {...body, date, time};
            Todo.findByIdAndUpdate(id, newObj, { new: true }).then(data => {
                res(data)
            });

        }); 
    };
    
    updateTodo(id, title) {
        return new Promise((res, rej) => {

            Todo.findByIdAndUpdate(id, { title }, { new : true })
            .then(data => {
                res(data); 
            })

        });
    };

    changeCompleted(id, isCompleted) {
        return new Promise((res, rej) => {
            Todo.findByIdAndUpdate(new ObjectId(id), { isCompleted }, { new: true })
                .then(data => res(data))
                .catch(err => console.log(err))
        })
    }

    delete(id) {
        return new Promise((res, rej) => {

            Todo.findByIdAndDelete(id)
                .then(data => res(`Todo with id ${data._id} deleted seccessfully`))
                .catch(() => rej(`I can't find this id: ${id}`));
                
        });
    };

};

module.exports = new TodoMongooseServices();