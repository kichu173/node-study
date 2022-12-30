const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');

// create a user/ sign up
router.post('/users', async function (req, res) {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user: user, token: token});
    } catch (e) {
        res.status(400).send(e);
    }

    console.log('user post req body:', req.body);// prints obj {} ex: { name: 'Kiran', email: 'kiran@example.com', password: 'Re' }
})

// Logging in user
router.post('/users/login', async function(req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);// findByCredentials is a model method
        const token = await user.generateAuthToken();// generateAuthToken is an instance method
        res.send({ user: user, token: token });
    } catch (e) {
        res.status(400).send();
    }
})

// Log out user
router.post('/users/logout', auth, async function(req, res) {
    // right here we can use the 'req.token' to delete it correctly off of that user profile.
    try {
        // we had to use filter to filter out specific tokens while leaving others in place.
        req.user.tokens = req.user.tokens.filter(function(token) {
            return token.token !== req.token;
        })

        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
})

// Log out user from all sessions
router.post('/users/logoutAll', auth, async function(req, res) {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

// * Every Single request to the API is going to require authentication with the exception of sign up and log in for everything else the client is going to need to provide that authentication token.
// * and the server is going to validate it before performing whatever operation they're trying to do.

// fetching multiple users (https://mongoosejs.com/docs/queries.html)
// * 2nd arg passed is middleware to a route for handling authentication. only when 2nd arg executes successfully, our 3rd arg function will start to execute.
router.get('/users/me', auth ,async function(req, res) {
    res.send(req.user);

    // commenting below code as we are not allowed to show user all other user's data. (http://localhost:3000/users)
    // try {
    //     const users = await User.find({});
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send();
    // }
})

// fetch a user
// router.get('/users/:id', async function(req, res) {
//     const _id = req.params.id;// mongoose automatically converts string id to ObjectId.

//     try {
//         const user = await User.findById(_id);
//         // no match found
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(500).send();
//     }

//     console.log(req.params); 
// })

// update an existing resource by id (/users/:id -> /users/me, so users can manipulate their own profile and they can't go off and mess with other users that are using task manager application.)
router.patch('/users/me', auth, async function (req, res) {
    // const _id = req.params.id;

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
        // alternate code for findByIdAndUpdate below to make our middleware 'pre' running as expected.
        // const user = await User.findById(_id);
        const user = req.user;
        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        await user.save();

        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });// 3rd arg is optional -> going to return the new user as opposed to the existing one that was found before the update. Commented out because our middleware 'pre' is not working.
        // if there was no user with id(invalid)
        // if (!user) {
        //     return res.status(404).send();
        // }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

// delete a resource by id (/users/:id -> /users/me)
router.delete('/users/me', auth, async function (req, res) {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);// req.params.id -> req.user._id (to delete their own profile)

        // if (!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();// remove the user whose authenticated
        res.send(req.user);// user -> req.user
    } catch (err) {
        res.status(500).send();
    }
})

module.exports = router;