require('../src/db/mongoose');// to connect to the database.
const Task = require('../src/models/task');

/* Exercise */ // Delete a task and find how many incomplete tasks are left using promise chaining.
Task.findByIdAndDelete('63a4971b74125cfe0c74767f').then((data) => {
    console.log('deleted data', data);
    return Task.countDocuments({
        completed: false
    })
}).then(function(result) {
    console.log(result);
}).catch(function(e) {
    console.log(e);
})

// Using async - await | Rewriting above code using async await

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);// you can also remove assigned variable as we are not using that const elsewhere in code and keep it as plain (ex: await Task.findByIdAndDelete(id);)
    const count = await Task.countDocuments({ completed: false });
    return count;
}

deleteTaskAndCount('63a4971b74125cfe0c74767f').then(function(result) {
    console.log('total no. of incomplete tasks', result);
}).catch(function(e) {
    console.log(e);
})