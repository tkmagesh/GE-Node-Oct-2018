const http = require('http'),
	path = require('path'),
	chalk = require('chalk');

const dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler'),
	app = require('./app');

app.use(dataParser);

app.use(function(req, res, next){
	let startTime = new Date();
	res.on('finish', function(){
		let endTime = new Date();
		let delta = endTime - startTime;
		console.log(chalk.red(req.method) + '\t' + chalk.blue(req.urlObj.pathname) + ' ' + chalk.bold.yellow(delta + 'ms'));
	});
	next();
});

app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveCalculator);
app.use(notFoundHandler);

http.createServer(app).listen(8080);

console.log('server listening on port 8080!');