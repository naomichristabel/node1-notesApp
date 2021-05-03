const chalk = require('chalk');
const { demandOption } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes.js');

//A function that is defined in another file (your own module) and used here in this file
notes.getNotes();

//List arguments passed at command line
console.log(process.argv);

//Shows the 3rd element in that array, which is the argument passed in command line
const command = process.argv[2];

//What to show, based on what is sent in the command line as argument
if (command==='add') {
    console.log('adding text');
} else if (command==='remove') {
    console.log('removing text');
}

//Printing in colour in console
console.log(chalk.green('SUCCESS'));

//Customize yargs version
yargs.version('1.1.0');

//All the arguments I pass in command line are put into an object (we call it argv)
//To pick out one particular argument and get its value, I use the object_name.property_name, for eg., argv.title

//Create add command
//To create a new option for your command, use builder property
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
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log("I am adding a new note now",argv);
        console.log("Title is: ",argv.title);
        console.log("Body is: ", argv.body);
        notes.addNote(argv.title,argv.body);
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log("I am removing a note now",argv);
        notes.removeNote(argv.title);
    }
});

//Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        console.log("I am listing all notes now");
        notes.listNotes();
    }
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Title of the note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log("I am reading a note now");
        notes.readNote(argv.title);
    }
});

//Calling yargs to display the arguments. If you don't write this line, then yargs won't bother parsing the arguments (previous lines won't work, nothing will be printed on the console)
//console.log(yargs.argv);

//An alternate to the previous statement, without actually printing the arguments on console:
yargs.parse();
