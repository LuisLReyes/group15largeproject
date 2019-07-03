const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const chatroomRoutes = express.Router();

let Chatroom = require('./chatroom.model');

app.use(cors());
app.use(bodyParser.json());

console.log("server.js loaded");


mongoose.connect('mongodb://group15:group15password@ds119660.mlab.com:19660/heroku_t5txprc7', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});


//API Routes




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

chatroomRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Chatroom.findById(id, function(err, chatroom){
        res.json(chatroom);
    });
});

chatroomRoutes.route('/add').get(function(req,res){
    let chatroom = new Chatroom(req.body);
    chatroom.save()
        .then(chatroom => {
            res.status(200).json({'chatroom':'chatroom added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new chat failed');
        });
});

app.use('/chatroom', chatroomRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
