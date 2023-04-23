const { ObjectId } = require('mongodb');
const { getConnectionMongoClient, useDefaultDb } = require('../config/db.js');
const dateObj = require('../helpers/date.js');


class TodoMongodbServices {
    async getAllTodo() {
        const client = await getConnectionMongoClient();
        const db = await useDefaultDb(client);
        const data = await db.collection('todos').find({}).toArray();
        client.close();
        return data;
    };

    async getTodoById(id) {
        const client = await getConnectionMongoClient();
        const db = await useDefaultDb(client);
        const data = await db.collection('todos').findOne({_id: new ObjectId(id)});
        client.close();
        return data;
    };

    async addTodo(body) {
        const { date, time } = dateObj;
        const data = {...body, isCompleted: false, date, time}
        const client = await getConnectionMongoClient();
        const db = await useDefaultDb(client);
        await db.collection('todos').insertOne(data)
        client.close();
        return data;
    };

    async editTodo(id, body) {
        const { date, time } = dateObj;
        const newObj = {...body, isCompleted: false, date, time};
        const client = await getConnectionMongoClient();
        const db = await useDefaultDb(client);
        const data = await db.collection('todos').updateOne({_id: new ObjectId(id)}, { $set: newObj }) // !!!!!!!!
        client.close();
        return { data, newObj }
        // return data.modifiedCount;
    };

    async updateTodo(id, title) {
        const client = await getConnectionMongoClient();
        const db = await useDefaultDb(client);
        const data = await db.collection('todos').updateOne({_id: new ObjectId(id)}, {$set: { title: title }}) // !!!!!!!!!!!
        client.close();
        return data;
    };

    async delete(id) {
        const client = await getConnectionMongoClient();
        const db = await useDefaultDb(client);
        const bool = await db.collection('todos').deleteOne({_id: new ObjectId(id)})
        client.close();
        return bool.deletedCount;
    };

}

module.exports = new TodoMongodbServices();