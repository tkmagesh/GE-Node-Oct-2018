const path = require('path'),
	fs = require('fs');
	
let staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.josn'];

function isStatic(resourceName){
	return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res, next, args){
	console.log(args);
	let resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
	if (isStatic(resourceName)){
		let resource = path.join(__dirname, resourceName);
		if (!fs.existsSync(resource)){
			console.log('[@serveStatic] - serving 404');
			res.statusCode = 404;
			res.end();
			next();
			return;
		}
		let stream = fs.createReadStream(resource);
		stream.pipe(res);
		stream.on('end', function(){
			next();
		});
		/*stream.on('data', function(chunk){
			console.log('[@serveStatic - data event');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('[@serveStatic - end event');
			res.end();
			next();
		});*/
	} else {
		next();
	}
}