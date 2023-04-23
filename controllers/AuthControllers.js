require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthServices = require('../services/AuthServices.js');

class AuthControllers {
    async login (login, password) {
        const findLogin = await AuthServices.findUserByLogin(login);
        if( findLogin ) {
            const comparePass = await bcrypt.compare(password, findLogin.password);
            if( comparePass ) {
                const token = jwt.sign({ login, password }, process.env.ACCESS_TOKEN);
                return token;
            } else {
                return { message: 'invalid token' }
            }
        } return null;
    };

    async register(login, password) {
        const findUser = await AuthServices.findUserByLogin(login);
        if( !findUser ) {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const createdUser = await AuthServices.createUser({ login, password: hashPass });
            return createdUser;
        } return null;
    }
}

module.exports = new AuthControllers();