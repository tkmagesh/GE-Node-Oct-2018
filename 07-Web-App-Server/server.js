/*
	server.js
	dataParser.js
	serveStatic.js
	serveCalculator.js
	notFoundHandler.js
*/
const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

let staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.josn'];

function isStatic(resourceName){
	return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

let server = http.createServer(function(req /*Readable Stream*/, res /* Writable Stream*/){
	var urlObj = url.parse(req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	let resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
	if (isStatic(resourceName)){
		let resource = path.join(__dirname, resourceName);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		let stream = fs.createReadStream(resource);
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		let data = querystring.parse(urlObj.query),
			op = data.op,
			n1 = parseInt(data.n1),
			n2 = parseInt(data.n2),
			result = calculator[op](n1, n2);

		res.write(result.toString());
		res.end(); 
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		let rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			let data = querystring.parse(rawData),
				op = data.op,
				n1 = parseInt(data.n1),
				n2 = parseInt(data.n2),
				result = calculator[op](n1, n2);

			res.write(result.toString());
			res.end(); 	
		});
		
	} else {
		res.statusCode = 404;
		res.end();
	}
	
});

server.listen(8080);

console.log('server listening on port 8080!');