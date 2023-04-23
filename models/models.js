const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    date: String,
    time: String
});

const Todo = mongoose.model('Todo', todoSchema, 'todos'); // (имя_схемы, схема, КОЛЛЕКЦИЯ)
module.exports = Todo;



// const mongodb = require('mongodb');
// const Schema = mongodb.schema();

// const todoSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     isCompleted: {
//         type: Boolean,
//         default: false
//     }
// });

// const Todo = todoSchema.model('Todo', todoSchema);
// module.exports = Todo;