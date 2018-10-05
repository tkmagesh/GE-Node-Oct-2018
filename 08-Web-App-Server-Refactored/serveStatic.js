const path = require('path'),
	fs = require('fs');
	
let staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.josn'];

function isStatic(resourceName){
	return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res){
	let resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
	if (isStatic(resourceName)){
		let resource = path.join(__dirname, resourceName);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		let stream = fs.createReadStream(resource);
		stream.pipe(res);
	}
}