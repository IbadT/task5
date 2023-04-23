const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    login: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true 
    }
})

const Auth = mongoose.model('authScmema', authSchema, 'authorizationUsers');
module.exports = Auth;