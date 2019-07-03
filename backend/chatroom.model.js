const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Chatroom = new Schema({
    user: {
        type: String
    },
    message: {
        type: String
    }
});

module.exports = mongoose.model('Chatroom', Chatroom);