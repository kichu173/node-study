const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')

// mongoose supports middleware and middleware allows ways to customize the behavior of your mongoose model. (https://mongoosejs.com/docs/middleware.html)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// virtual property which is not stored in db, it is just for mongoose to be able to figure out who owns what and how they're related.
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// restricting response when sending back data(like passwords/tokens) to user when they login
// toJSON that allows it to run even though we're never explicitly calling this.
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// methods are accessible on the instances
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString(), // converting Object ID to a standard string which jwt is expecting.
    }, 'thisismynewstudy');

    user.tokens = user.tokens.concat({token: token});
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    
    return user;
}

// run some code before a user is saved/updated. middleware used to Hash the plain text password before saving.
userSchema.pre('save', async function(next) {
    const user = this;
    // will be true when the user is first created and will also be true if the user is being updated and password was one of the things changed.
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    console.log('just before saving', user);// just before saving { name: 'Jessica', email: 'jessica@example.com', age: 0, password: 'Blue12345!', _id: new ObjectId("63ac737e6b4d8499a60ef261") }
    next();// mark the function is over.
})

// Delete user tasks when user is removed (middleware) -> executes before the user is removed.
userSchema.pre('remove', async function (next) {
    const user = this;

    // Removing user/owner's tasks as well.
    await Task.deleteMany({ owner: user._id })

    next();
})

// Defining a model
const User = mongoose.model('User', userSchema);

module.exports = User;


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