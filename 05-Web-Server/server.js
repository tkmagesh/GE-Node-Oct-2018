const http = require('http');

let server = http.createServer(function(req /*Readable Stream*/, res /* Writable Stream*/){
	res.write('<h1>Welcome to Node.js</h1>');
	res.end();
});

server.listen(8080);

console.log('server listening on port 8080!');