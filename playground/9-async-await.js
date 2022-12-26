// In JS functions if we don't explicitly return something from function undefined is implicitly returned.
// If we make function async marked before declaration and have no body content in block then - Promise { undefined } is implicitly returned. 
// async functions always returns a promise. that promise is fulfilled with the value you the developer choose to return from the function.
// In async function body if you have single line like return 'some string value', then you invoke the function it returns Promise { 'some string value' } because async functions always returns promise that gets fulfilled with that string - 'some string value'.
// As async function is always returning Promise, you can use 'then()' operator to promise chain to get resolved or rejected data. ex: doWork().then((res) => {log(res)}).catch(e => log(e));
// The main useful feature is await operator, now the await operator can only be used in async functions.
// await promise - syntax - in this way await operator gets used with a promise(ex: await add(1, 99) -> add() is a promise) which either resolves or rejects, if resolved then the next line await promise is executed - code to look in synchronous style(bts: it is asynchronous), if rejected next lines won't be executed and catch is called.
// async await works with promises internally and it provides better code readability and flexibility while working with promises. It removes the need of promise chaining with adding many callback functions.

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (a < 0 || b < 0) {
                reject('Numbers must be non-negative');
            }
            resolve(a + b);
        }, 2000);
    })
}

// much better way than writing code same in promise chaining.
const doWOrk = async () => {
    const sum = await add(1, 99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, -3);
    return sum3; // if you want to remove multiple sum variable you can return object by grouping into obj {}.
}

doWOrk().then((res) => {
    console.log('result', res);// result 153
}).catch((e) => {
    console.log('e', e);// e Numbers must be non-negative
})