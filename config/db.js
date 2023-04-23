require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.URL2);


async function getConnectionMongoClient() {
    
    // correct
    return MongoClient.connect(process.env.URL2, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client)
    

    // correct
    // return await client.connect() 


    // correct
    // const client = await MongoClient.connect(process.env.URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    // console.log('Connected')
    // return client
}

async function useDefaultDb(client) {
    const db = await client.db('DBtodos');
    return db;
}









// mongoose

const mongoose = require('mongoose');
const URL = process.env.URL1;

const db = async () => {
    mongoose.connect(URL)
        .then(() => console.log('Database is connected'))
        .catch(err => console.log(err));
}
module.exports = {
    getConnectionMongoClient,
    useDefaultDb,
    db
}











// OpenAI
// async function main() {
//     MongoClient.connect(process.env.URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then((client) => {
//         const db = client.db('DBtodos');
//         const collection = db.collection('todos');
     
//         return collection.find({}).toArray()
//             .then(docs => console.log(docs))
//             .catch(err => console.error(`Failed to find documents: ${err}`));
//     })
//     .catch(err => console.error(err));
// }