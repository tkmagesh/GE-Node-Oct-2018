const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

let server = http.createServer(function(req /*Readable Stream*/, res /* Writable Stream*/){
	var urlObj = url.parse(req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	let resource = path.join(__dirname, (urlObj.pathname === '/' ? 'index.html' : urlObj.pathname));
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}
	let stream = fs.createReadStream(resource);
	stream.pipe(res);
});

server.listen(8080);

console.log('server listening on port 8080!');