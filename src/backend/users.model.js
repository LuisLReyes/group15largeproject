const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

let User = new Schema({
    user_name: {
        type: String,
        unique: true,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

User.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if(err){
            return next(err);
        }
        user.password=hash;
        next();
    })
})
module.exports = mongoose.model('User', User);