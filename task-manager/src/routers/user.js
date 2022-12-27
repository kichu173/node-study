const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async function (req, res) {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }

    console.log('user post req', req.body);// prints obj {} ex: { name: 'Kiran', email: 'kiran@example.com', password: 'Re' }
})

// fetching multiple users (https://mongoosejs.com/docs/queries.html)
router.get('/users', async function(req, res) {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(500).send();
    }
})

// fetch a user
router.get('/users/:id', async function(req, res) {
    const _id = req.params.id;// mongoose automatically converts string id to ObjectId.

    try {
        const user = await User.findById(_id);
        // no match found
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }

    console.log(req.params); 
})

// update an existing resource by id
router.patch('/users/:id', async function (req, res) {
    const _id = req.params.id;
    // custom validation to check if the property we are trying to update is present in the document as field or not. if we are not writing this mongoose will return status 200 by ignoring that property.
    const updates = Object.keys(req.body); // ex:['height'] -> convert req.body from an object to an array of properties
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    // every will return true if all updates in array return true, if any single update in array return false then every will returns false.
    const isValidToUpdate = updates.every(function(update) {
        return allowedUpdates.includes(update);
    })

    if (!isValidToUpdate) {
        return res.status(400).send({error: 'Property does not exist!'});
    }
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });// 3rd arg is optional -> going to return the new user as opposed to the existing one that was found before the update.
        // if there was no user with id(invalid)
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

// delete a resource by id
router.delete('/users/:id', async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (err) {
        res.status(500).send();
    }
})

module.exports = router;