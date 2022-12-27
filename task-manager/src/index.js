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