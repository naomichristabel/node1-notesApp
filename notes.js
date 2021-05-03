const fs = require('fs');
const chalk = require('chalk');
const { parse } = require('node:path');

const getNotes = () => {
    console.log("Your notes....");
}

const addNote = (title,body) => {
    console.log("inside add note fn")
    const notes = loadNotes();

    //array_name.filter will run the function inside it, once for each array element (this is the parameter inside that function) 
    //    and if it returns true (after checking some condition), it is added in the duplicates_array. 
    //       That is how it filters.
    //Filter is a subset of the array you are working on
    
    //const duplicateNotes = notes.filter((note) => note.title === title); //if the title of the note that is being checked in the notes array equals the title of the note being added
    const duplicateNote = notes.find((note) => note.title === title); //this array method FIND stops after finding one duplicate note
    
        //if (duplicateNotes.length === 0) {
        if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Title is already taken! New note has not been added.'));
    }
    
    console.log(notes);
}

const removeNote = (title) => {
    console.log("I am going to remove the note now");
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title); 
        
    if(notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note removed!'));
    }
    else
        console.log(chalk.red.inverse('No note found!'));
}

const listNotes = () => {
    console.log("I am going to list the notes now");
    console.log(chalk.blue.inverse("YOUR NOTES:"));
    const notes = loadNotes();
    notes.forEach(note => console.log(note.title));
    
}

const readNote = (title) => {
    console.log("I am going to read this note now");
    const notes = loadNotes();
    const noteRead = notes.find((note) => note.title === title);
    
    if(noteRead) {
        console.log(chalk.inverse(noteRead.title));
        console.log(noteRead.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }

}

const loadNotes = () => {
    try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}