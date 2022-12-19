// A callback function is nothing more than a function we provide as an argument to another function
// with the intention of having it called later on.

setTimeout(() => {
    console.log('Two seconds are up')
}, 2000)

const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter((name) => {
    return name.length <= 4
})

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        // return data; // will not work as it is not returning to geocode function, it is a return to setTimeout().
        callback(data) // better way of handling return in async env is callback.
    }, 2000)
}

geocode('Philadelphia', (data) => {
    console.log(data)// { latitude: 0, longitude: 0 }
})

// links.mead.io/callback
const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

// callback example (video.10 - mongodb and promises section)
const doWorkCallback = function(callback) {
    setTimeout(function() {
        //callback(undefined, 'success');
        callback('Something went wrong');
    }, 2000)
}

doWorkCallback(function(err, result) {
    if (err) {
        return console.log(err);;
    }

    console.log(result);
});