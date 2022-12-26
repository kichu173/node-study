const mongoose = require('mongoose');
const validator = require('validator');

// Defining a model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
           if(!validator.isEmail(value)) {
            throw new Error('Email is invalid');
           }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Please check your password')
            }
        }
    }
})

module.exports = User


// creating an instance of model
// const me = new User({
//     name: '   Ravi   ',
//     email: 'ravi@mead.io  ',
//     password: 'phone098!'
// })

//  save the model instance to db.
// me.save().then(function(me) {
//     console.log(me);
// }).catch(function(err) {
//     console.log('Error!', err);
// })