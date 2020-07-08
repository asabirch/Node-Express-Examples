const fs = require('fs');
let readDataCallback = (err, data) => {
    console.log(`Provided file contained: ${data}`);
};
fs.readFile('./finalFile.txt', 'UTF-8', readDataCallback);
var secretWord = 'cheeseburgerpizzabagels'
