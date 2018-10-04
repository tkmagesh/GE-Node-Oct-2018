const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

let server = http.createServer(function(req, res){
	let urlObj = url.parse(req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	if (urlObj.pathname === '/calculator'){
		let data = querystring.parse(urlObj.query),
			op = data.op,
			n1 = parseInt(data.n1),
			n2 = parseInt(data.n2),
			result = calculator[op](n1, n2);

		res.write(result.toString());
		res.end(); 
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8085);

console.log('server listening on port 8080!');