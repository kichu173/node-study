const doWorkPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        // resolve([1, 4, 7]);
        reject('fail');
    }, 3000);
})

doWorkPromise.then(function(result) {
    console.log('success:: ', result); // [1,4,7]
}).catch(function(err) {
    console.log('Error:: ', err);
});

// promise -- pending(In pending state for 2sec before resolve or reject is called)
// pending --> Either fulfilled(resolve()) or rejected(reject())

// Promise chaining
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(a + b);
        }, 2000);
    })
}

// avoid promise hell/pyramid of doom
// add(5, 5).then(function(data) {
//     console.log(data);

//     add(data, 5).then(function(sum) {
//         console.log(sum);
//     }).catch((e) => {
//         console.log(e);
//     })
// }).catch(function(err) {
//     console.log(err);
// })

add(1,1).then(function(data){
    console.log(data);
    return add(data, 4);// returning a promise and next then() will be executed when returned promise is fulfilled, for promise chaining we should return a promise.
}).then(function(sum) {
    console.log(sum);
}).catch((e) => {
    console.log(e);
})