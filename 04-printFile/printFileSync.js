const fs = require('fs');

let fileContents = fs.readFileSync('./sample.txt', { encoding : 'utf8'});

console.log(fileContents);

console.log('Thats all folks!!!');