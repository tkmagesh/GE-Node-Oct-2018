const http = require('http');

const dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler');

let server = http.createServer(function(req, res){
	dataParser(req);
	console.log(req.method + '\t' + req.urlObj.pathname);
	serveStatic(req, res);
	serveCalculator(req, res);
	notFoundHandler(res);
});

server.listen(8080);

console.log('server listening on port 8080!');