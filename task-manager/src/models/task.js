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