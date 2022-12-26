require('../src/db/mongoose');// to connect to the database.
const User = require('../src/models/user');

// Here we are trying to update an user id's age field value and find the count of user's with similar age using promise chaining.
User.findByIdAndUpdate('63a4a2e50b995de95cd22e4f', {
    age: 1
}).then(function(user) {
    console.log(user);
    return User.countDocuments({
        age: 1
    })
}).then(function(users) {
    console.log('users with similar age is',users);
}).catch(e => {
    console.log(e);
})

// Using async - await | Rewriting above code using async await

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age });
    const count = await User.countDocuments({ age: age })
    return count;
} 

updateAgeAndCount('63a4a2e50b995de95cd22e4f', 1).then(function(count) {
    console.log(count);
}).catch(e => {
    console.log(e);
})