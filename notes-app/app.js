// The require function is how we load in other things whether it's a core node module
// or a another file we created or an NPM module we've chosen to install into use in our projects.

const yargs = require('yargs');
const notes = require('./notes');

// create add command (node app.js add --title="recipe-2" --body="sauceage")
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// create remove command (node app.js remove --title="recipe-2")
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'remove note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log(argv.title+" - title to be removed.");
        notes.removeNote(argv.title);
    }
})

// create a read note command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.readNote(argv.title); //  node app.js read --title="recipe-2"
    }
})

// read list of notes command (node app.js list)
yargs.command({
    command: 'list',
    describe: 'Read a list of notes',
    handler: function() {
        notes.listNotes();
    }
})

// add, remove, read, list (operations to perform in notes app)

// debugger; (run cmd as node inspect app.js add --title="Courses" --body="NodeJs" , in chrome type chrome://inspect, look at remote target, to rerun after completed then in cmd line type debug> restart, shutdown/terminate using ctrl+c(twice) | try this if first one not works(windows only) - node --inspect-brk app.js add --title="Courses" --body="NodeJs")


// console.log(process.argv);// node app.js add | node app.js --help
// console.log(yargs.argv);

yargs.parse()