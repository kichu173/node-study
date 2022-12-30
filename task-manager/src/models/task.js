const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // ex:  ObjectId("63af1aeaa07342252dc286d8")
        required: true,
        ref: 'User' // reference to create a relationship
    }
})

module.exports = Task

// const task = new Task({
//     description: 'Task 3  ',
//     completed: true
// })

// task.save().then(function(task) {
//     console.log(task);
// }).catch(function(err) {
//     console.log('Error!', err);
// })

// ? Two ways we could set up the relationship between a user and a task. 
// ? 1. The user could store something like the id of all of the tasks they've created.
// ? 2. The individual task could store the id of the user who created it. (better approach)