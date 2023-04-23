require('dotenv').config();
const express = require('express');


const app = express();
const routes = require('./routes/index.js')
const PORT = process.env.PORT;

const Sentry = require('@sentry/node');
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
Sentry.init({
  dsn: process.env.DSN,
})


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const cors = require('cors');
app.use(cors());

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
      openapi: '3.0.0'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "name": "Authorization"
      }
    },
  },
  apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// mongoose
const { db } = require('./config/db.js');
db();



app.use('/api', routes);

app.listen(PORT, console.log('Server is started...'));

module.exports = app;




// const mongoose = require('mongoose');
// mongoose.connect(process.env.URL)
//     .then(() => console.log('Seccess connect to MongoDB'))




// const { MongoClient } = require('mongodb');
// const client = new MongoClient(process.env.URL);
// async function test() {
//     const collection = await client.db('DBtodos').collection('todos').find({}).toArray();
//     console.log(collection)
//     return 'done'
// }
// test()