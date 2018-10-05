
let _middlewares = [];

function exec(req, res, middlewares, args){
	let first = middlewares[0],
		remaining = middlewares.slice(1),
		next = function(args){
			exec(req, res, remaining, args);
		};
	if (typeof first === 'function')
		first(req, res, next, args);
}

function app(req, res){
	exec(req, res, _middlewares);
}

app['use'] = function(middleware){
	_middlewares.push(middleware);
};

module.exports = app;