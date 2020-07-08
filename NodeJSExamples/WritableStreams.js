const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
    input: fs.createReadStream('shoppingList.txt')
});

var fileStream = fs.createWriteStream('shoppingResults.txt');

var transformData = (line) => {
    fileStream.write(`They were out of: ${line}\n`);
};

myInterface.on('line', transformData);
