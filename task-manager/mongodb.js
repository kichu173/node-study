// CRUD
// mongodb npm library(native driver created by mongodb company allowing us to connect to mongodb database from nodeJs).
const mongodb = require('mongodb');

// MongoClient is gonna give us access to the function necessary to connect it to the database.
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

// connect to the db server
MongoClient.connect(connectionURL, { useNewUrlParser: true }, function(error, client) {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    console.log('Connection successful!');
    // db we are trying to manipulate, using it in code is enough to create a new database.
    const db = client.db(databaseName);

    // -- insert -- a document into users collection
    // db.collection('users').insertOne({
    //     name: 'Vikram',
    //     age: 29
    // }, function(error, result) {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result.insertedId);// returns the inserted document ObjectId
    // })

    // insert multiple documents into users collection
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], function(error, result) {
    //     if (error) {
    //         return console.log('Unable to insert documents!');
    //     }
    //     console.log(result.insertedIds);
    // })

    // Insert 3 tasks into a new tasks collection
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'nodeJS',
    //         completed: false
    //     },
    //     {
    //         description: 'ReactJS',
    //         completed: false
    //     },
    //     {
    //         description: 'Javascript',
    //         completed: true
    //     }
    // ], function(error, result) {
    //     if (error) {
    //         return console.log('Unable to insert documents into tasks collection!');
    //     }

    //     console.log(result.insertedIds);
    // })

    // -- READ --

    // To find an individual document, if multiple documents matched it returns first one back.
    // db.collection('users').findOne({
    //     _id: ObjectID('63a09e282f39e076fcab7d29')
    // }, function (err, user) {
    //     if (error) {
    //         return console.log('Unable to insert documents into tasks collection!');
    //     }

    //     console.log(user);
    // })


    // To find multiple documents with matching condition.
    // db.collection('users').find({
    //     age: 27
    // }).toArray(function(error, users) {
    //     console.log(users);
    // })

    // db.collection('users').find({
    //     age: 27
    // }).count(function(error, count) {
    //     console.log(count);
    // })

    // db.collection('tasks').findOne({
    //     _id: ObjectID('63a097e817bbabd0d8b619b2'),
    // }, function(error, task) {
    //     if (error) {
    //         return console.log('Unable to insert documents into tasks collection!');
    //     }

    //     console.log(task);
    // })

    // db.collection('tasks').find({
    //     completed: false,
    // }).toArray(function(error, tasks) {
    //     console.log(tasks);
    // })

    // -- Update --

    // const updatePromise = db.collection('users').updateOne({
    //     _id: ObjectID('63a093a75d03a42981cacd94')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // })

    // updatePromise.then(function(data) {
    //     console.log(data);
    // }).catch(function(err) {
    //     console.log(err);
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then(function(data) {
    //     console.log(data);
    // }).catch(function(err) {
    //     console.log(err);
    // })

    // -- delete --

    // db.collection('users').deleteOne({
    //     _id: ObjectID("63a0942b8f45072bba2d5f8c"),
    // }).then((data) => console.log(data)).catch(err => console.log(data))

    // db.collection('users').deleteMany({
    //     age: 27,
    // }).then((data) => console.log(data)).catch(err => console.log(data))

});