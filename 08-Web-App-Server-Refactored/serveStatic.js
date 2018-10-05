const path = require('path'),
	fs = require('fs');
	
let staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.josn'];

function isStatic(resourceName){
	return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(publicFolderPath){
	return function(req, res, next, args){
		let resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
		if (isStatic(resourceName)){
			let resource = path.join(publicFolderPath, resourceName);
			console.log(resource);
			if (!fs.existsSync(resource)){
				next();
				return;
			}
			let stream = fs.createReadStream(resource);
			stream.pipe(res);
			stream.on('end', function(){
				next();
			});
		} else {
			next();
		}
	}
}