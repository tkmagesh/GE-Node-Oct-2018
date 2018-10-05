const querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator' && req.method === 'GET'){
		let data = querystring.parse(req.urlObj.query),
			op = data.op,
			n1 = parseInt(data.n1),
			n2 = parseInt(data.n2),
			result = calculator[op](n1, n2);

		res.write(result.toString());
		res.end(); 
		next();
	} else if (req.urlObj.pathname === '/calculator' && req.method === 'POST'){
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
			next();	
		});
		 
	} else {
		next();
	}
}