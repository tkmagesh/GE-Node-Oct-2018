const fs = require('fs');

let stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'});
/* open, data, end, close and error -> events */

stream.on('error', function(err){
	console.log('something went wrong');
	console.log(err);
});

let readCount = 0;

stream.on('end', function(){
	console.log('Thats all folks!!!');
	console.log('Read count = ', readCount);
});


stream.on('data', function(chunk){
	++readCount;
	console.log(chunk);
});



