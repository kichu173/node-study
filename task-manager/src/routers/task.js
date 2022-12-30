const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

// --- Task router REST API's ---
// create a task
router.post('/tasks', auth, async function (req, res) {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    console.log('tasks', req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(err);
    }
})

// fetch all tasks
router.get('/tasks', auth, async function(req, res) {
    try {
        const tasks = await Task.find({ owner: req.user._id });// another way to return tasks only for the authenticated user is using populate (refer index.js) -> await req.user.populate('tasks') | res.send(req.user.tasks)
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
})

// fetch a task by it's id
router.get('/tasks/:id', auth, async function(req, res) {
    const _id = req.params.id;

    try {
        //const task = await Task.findById(_id);
        const task = await Task.findOne({ _id: _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

    console.log(req.params); 
})

// update task
router.patch('/tasks/:id', auth, async function(req, res) {
    // custom validation to check if the property we are trying to update is present in the document as field or not. if we are not writing this mongoose will return status 200 by ignoring that property.
    const updates = Object.keys(req.body); // ex:['height'] -> convert req.body from an object to an array of properties
    const allowedUpdates = ['description', 'completed'];
    // every will return true if all updates in array return true, if any single update in array return false then every will returns false.
    const isValidToUpdate = updates.every(function(update) {
        return allowedUpdates.includes(update);
    })

    if (!isValidToUpdate) {
        return res.status(400).send({error: 'Property does not exist!'});
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        // alternate code for findByIdAndUpdate below to make our middleware 'pre' running as expected.
        //const task = await Task.findById(req.params.id);

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });// 3rd arg is optional -> going to return the new user as opposed to the existing one that was found before the update.
        // if there was no task with id(invalid)
        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            task[update] = req.body[update];
        })

        await task.save();

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

// delete task by id
router.delete('/tasks/:id', auth, async function (req, res) {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (err) {
        res.status(500).send();
    }
})

module.exports = router;