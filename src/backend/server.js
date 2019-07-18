const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chatroomRoutes = express.Router();
const chatlogRoutes = express.Router();
const userRoutes = express.Router();
const session = require('express-session')
const PORT = 4000;

let Chatroom = require('./chatroom.model');
let User = require('./users.model');
let Chatlog = require('./chatlog.model');

app.use(cors()); 
app.use(bodyParser.json());

app.use(session({
    secret: 'pilebunker',
    resave: true,
    saveUninitialized: false
  }));

mongoose.connect('mongodb://group15:group15password@ds119660.mlab.com:19660/heroku_t5txprc7', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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

//Add a chat entry into a room
chatroomRoutes.route('/newmessage/:id').post(function(req,res){
    Chatroom.findById(req.params.id, function(err, chatroom){
        if(!chatroom){
            res.status(404).send("Chatroom of that ID is not found.");
        }
        else{
            let chatlog = new Chatlog(req.body);

            Chatroom.updateOne(
                { _id: req.params.id},
                { $push: {chat_log: chatlog} }
            ).then(chatroom => {
                res.json('Chatlog entry added');
            })
            .catch(err =>{
                res.status(400).send("Chatlog failed to add new entry");
            });
        };
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

//Login a user
userRoutes.route('/login').post(function(req,res){
    User.authenticate(req.body.user_name,req.body.password, function(error, user){
        if( error || !user){
            console.log('Login Error: ' + error);
            console.log('Failed user: ' + user);
            return res.status(401).json({'message':'Login failed'});
        } else {
            req.session.userId = user._id;
            console.log('Logging in user' + user._id);
            return res.status(200).json({'message':'Login Successful'});
        }
    })
})

//Logout and kill the session
userRoutes.get('/logout', function (req,res,next){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                console.log(err);
                return err;
            } else{
                //add what to do on logout
            }
        })
    }
})
app.use('/chatroom', chatroomRoutes);
app.use('/chatlog', chatlogRoutes);
app.use('/user', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
