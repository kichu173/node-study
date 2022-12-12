const fs = require('fs');
const chalk = require('chalk');

function addNote(title, body) {
    const notes = loadNotes();
    // should not allow to add notes with title that already exists.
    // variable duplicateNotes - returns empty array, [] if new item is added.
    // Use find method to stop when we have the first match rather processing through end of the items in array even after match found.
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title;
    })

    if (duplicateNotes.length > 0) {
        console.log(chalk.red.inverse('Note title taken!'));
        return;
    }

    notes.push({
        title: title,
        body: body
    });

    console.log(chalk.green.inverse('New note added'));
    saveNotes(notes);
}

function removeNote(title) {
    const notes = loadNotes();
    // check if the note exists with the given title
    const noteIndex = notes.findIndex(function(note) {
        return note.title.toLowerCase() === title.toLowerCase();
    })
    // below commented one is a alternate way(above to findIndex)
    /*
    const notesToKeep = notes.filter(function(note) {
        return note.title !== title;
    })
    saveNotes(notesToKeep);
    if (notes.length > notesToKeep.length) {
        console.log('Note has removed');
    } else {
        console.log('No Note found');
    }
    */

    if (noteIndex > 0) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        console.log(chalk.inverse.green('note has been removed'));
    } else {
        console.log(chalk.inverse.red('No notes found with given title'));
    }
}

function listNotes() {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes'));
    notes.forEach(function(note) {
        console.log(note.title);
    })
}

function readNote(title) {
    const notes = loadNotes();
    // search for the title in array. if no note found then it returns undefined.
    const note = notes.find(function(note) {
        return note.title === title;
    })
    if (!note) {
        console.log(chalk.red('No note found!'));
        return;
    }
    console.log(chalk.bold.inverse(note.title));
    console.log(note.body);
}

function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}