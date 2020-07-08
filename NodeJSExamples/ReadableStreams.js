const readline = require('readline');
const fs = require('fs');
var myInterface = readline.createInterface({
    input: fs.createReadStream('shoppingList.txt')
});

var printData = (data) => {
    console.log(`Item: ${data}`);
};

myInterface.on('line', printData);

