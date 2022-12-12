// const square = function (x) {
//     return x * x;
// }

const square = x => x * x;

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList: function() {
        console.log('Guest List for ' + this.name);
        this.guestList.forEach(function(guest) {
            console.log(guest + ' is attending ' + this.name);// Jen is attending undefined
        })
    }
}

const event1 = {
    name: 'Birthday Party',
    printGuestList: () => {
        console.log('Guest List for ' + this.name);// Guest List for undefined
    }
}

const event2 = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest List for ' + this.name);// Guest List for Birthday Party
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);// Jen is attending Birthday Party
        })
    }
}

console.log(square(3));
event.printGuestList();
event1.printGuestList();
event2.printGuestList();