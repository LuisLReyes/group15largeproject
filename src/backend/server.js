const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chatroomRoutes = express.Router();
const PORT = 4000;

let Chatroom = require('./chatroom.model');
let User = require('./users.model');
let Chatlog = require('./chatlog.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://group15:group15password@ds119660.mlab.com:19660/heroku_t5txprc7', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});


//Chatroom Functions
//Get all chatrooms
chatroomRoutes.route('/').get(function(req,res){
    Chatroom.find(function(err,chatroom){
        if(err){
            console.log(err);
        }
        else{
            res.json(chatroom);
        }
    });
});

//Get a chatroom by ID
chatroomRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Chatroom.findById(id, function(err, chatroom){
        res.json(chatroom);
    });
});

//Add a new chatroom
chatroomRoutes.route('/add').post(function(req,res){
    let chatroom = new Chatroom(req.body);
    chatroom.save()
        .then(chatroom => {
            res.status(200).json({'message':'chatroom added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new chat failed');
        });
});

//Chatlog Functions
//Get all chatlogs
chatlogRoutes.route('/').get(function(req,res){
    Chatlog.find(function(err,chatlog){
        if(err){
            console.log(err);
        }
        else{
            res.json(chatlog);
        }
    });
});

//Get a chatlog by ID
chatlogRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Chatlog.findById(id, function(err, chatlog){
        res.json(chatlog);
    });
});

//Add a new chatlog
chatlogRoutes.route('/add').post(function(req,res){
    let chatlog = new Chatlog(req.body);
    chatlog.save()
        .then(chatlog => {
            res.status(200).json({'message':'chatlog added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new chatlog failed');
        });
});

//User Functions
//Get all users
userRoutes.route('/').get(function(req,res){
    User.find(function(err,user){
        if(err){
            console.log(err);
        }
        else{
            res.json(user);
        }
    });
});

//Get a user by ID
userRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    User.findById(id, function(err, user){
        res.json(user);
    });
});

//Add a new user
userRoutes.route('/add').post(function(req,res){
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'message':'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});


app.use('/chatroom', chatroomRoutes);
app.use('/chatlog', chatlogRoutes);
app.use('/user', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
