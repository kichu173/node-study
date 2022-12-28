const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

const port = process.env.PORT || 3000

// helps to parse incoming req json to an object
app.use(express.json())

// Separate Route files related to users/tasks.
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server running on port', port);
})

// Understand how to securely store password with npm library in isolation.
// const bcrypt = require('bcryptjs');

// async function myFunction() {
//     const password = 'Red12345!';
//     const hashedPassword = await bcrypt.hash(password, 8); // 2nd arg is no. of rounds we want to perform(how many times the hashing algo is executed). Number 8 is good balance and recommended.
//     console.log(password);
//     console.log(hashedPassword);

//     // figure out if a given password during login matches the hashed password that we'll store in the database.
//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     console.log(isMatch);
// }

// myFunction();


// Understand how to use JWT authentication token mechanism with npm library in isolation.
const jwt = require('jsonwebtoken');

async function myFunction() {
    // if you're trying to delete a task created by you to be authenticated so I can make sure that you are the one to create it and I don't want to allow delete a task created by some other user.
    // Jwt sign() to create a token and this token will be provided to the client who tries to login and then use the token later on to perform those privileged operations like creating a task/delete a task.
    const token = jwt.sign({
        _id: 'abc123'
    }, 'thisismynewstudy', { expiresIn: '7 days' });// first arg is a object contains the data that's going to be embedded in your token(payload) and second arg is secret, used to sign the token making sure that it has'nt been tampered with or altered in.

    // https://www.base64decode.org/
    console.log(token);// base64 encoded json string(Header/Payload) | Header(contains meta info about what type of token it is, it's a jwt and the algorithm that was used to generate it).payload or body(This contains the data we provided which in our case would be the _id from up above, iat- issued at).Signature(used to verify the token)

    const data = jwt.verify(token, 'thisismynewstudy');// verify token, 2nd arg is secret(I need to use the exact same secret that the token was created with). returns payload if token verification goes smooth else throws error.
    console.log(data);// { _id: 'abc123', iat: 1672250830 }
}

myFunction();