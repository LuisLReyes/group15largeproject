const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Chatroom = new Schema({
    room_name: {
        type: String
    },
    room_type: {
        type: String
    },
    owner: {
        type: String
    },
    chat_log: {
        type: String
    }
});

module.exports = mongoose.model('Chatroom', Chatroom);