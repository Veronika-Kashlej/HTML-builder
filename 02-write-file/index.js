const fs = require('fs');
const readline = require('readline');
const path = require("path");
const { text } = require('stream/consumers');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.open(path.join(__dirname, "./text.txt"), 'w', (err) => {
    if (err) throw err;
});

rl.setPrompt('Enter text: \n');
rl.prompt();

function writeFile(text) {
    fs.appendFile(path.join(__dirname, "./text.txt"), text + '\n', (err) => {
        if (err) throw err;
        console.log('Text has been added to the file!');
        console.log('Enter text:')
    })
}
rl.on('line', (inf) => {
    if (inf.toLowerCase() === 'exit') {
        rl.close();
    } else {
        writeFile(inf);
    }
}).on('close', () => {
    console.log('Good bye!');
    process.exit();
})

