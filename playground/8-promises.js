const doWorkPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        // resolve([1, 4, 7]);
        reject('fail');
    }, 2000);
})

doWorkPromise.then(function(result) {
    console.log('success:: ', result); // [1,4,7]
}).catch(function(err) {
    console.log('Error:: ', err);
});

// promise -- pending(In pending state for 2sec before resolve or reject is called)
// pending --> Either fulfilled(resolve()) or rejected(reject())