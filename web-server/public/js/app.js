console.log('Client side JS file is loaded!');
// Test - Puzzle api
fetch(`https://puzzle.mead.io/puzzle`).then((res) => {
    // console.log('response', res); // response objet with http status, body..
    // console.log(res.json());// return promise object
    res.json().then((data) => {
        // access to parsed data
        console.log('Puzzle data::', data);
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        })
    })
})