const fs = require('fs');
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
}

const bookJSON = JSON.stringify(book);
fs.writeFileSync('1-json.json', bookJSON);

// read a file
const dataBuffer = fs.readFileSync('1-json.json');// we get back a buffer which is a way for nodejs to represent binary data.(<Buffer 7b 22 74 ........)
const dataJSON = dataBuffer.toString(); // {"title":"Ego is the Enemy","author":"Ryan Holiday"}
const data = JSON.parse(dataJSON);
console.log(data.title);