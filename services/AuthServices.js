const Auth = require('../models/authModels.js');

class AuthServices {
    findUserByLogin( login ) {
        return new Promise((res, rej) => {
            
            Auth.findOne({ login })
                .then(data => res(data))
                .catch(err => rej(err));

            // const client = await getConnectionMongoClient();
            // const db = await useDefaultDb(client);
            // const finderLogin = await db.collection('authorizationUsers').findOne({ login })
            // client.close();
            // return finderLogin;
        })
    };

    createUser( user ) {
        return new Promise((res, rej) => {

            const newUser = new Auth( user );
            newUser.save();
            res(newUser)

            // const client = await getConnectionMongoClient();
            // const db = await useDefaultDb(client);
            // const finderLogin = await db.collection('authorizationUsers').insertOne( user )
            // client.close();
            // return finderLogin;
        })
    }
};

module.exports = new AuthServices();