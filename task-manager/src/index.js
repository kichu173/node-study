const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

const port = process.env.PORT || 3000

// helps to parse incoming req json to an object
app.use(express.json())

app.post('/users', function (req, res) {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user)
    }).catch(err => {
        res.status(400).send(err);
    })
    console.log(req.body);
})

// fetching multiple users (https://mongoosejs.com/docs/queries.html)
app.get('/users', function(req, res) {
    User.find({}).then((users) => {
        res.send(users);
    }).catch(err => {
        res.status(500).send();
    })
})

// fetch a user
app.get('/users/:id', function(req, res) {
    const _id = req.params.id;// mongoose automatically converts string id to ObjectId.

    User.findById(_id).then((user) => {
        // no match found
        if(!user) {
            return res.status(404).send();
        }
        
        res.send(user);
    }).catch(err => {
        res.status(500).send();
    })  
    console.log(req.params); 
})

//Task app REST API's
app.post('/tasks', function (req, res) {
    const task = new Task(req.body);
    console.log('tasks', req.body);

    task.save().then(() => {
        res.status(201).send(task)
    }).catch(err => {
        res.status(400).send(err);
    })
})

// fetch all tasks
app.get('/tasks', function(req, res) {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send();
    })
})

// fetch a task by it's id
app.get('/tasks/:id', function(req, res) {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch((err) => {
        res.status(500).send();
    })  
    console.log(req.params); 
})

app.listen(port, () => {
    console.log('Server running on port', port);
})