const greeter = (name = 'user', age) => {
    console.log('Hello ' + name)
}

greeter('Andrew') // Hello Andrew

greeter()// Hello user