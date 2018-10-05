const fs = require('fs'),
	path = require('path');

const dbFile = path.join(__dirname, 'taskDb.json');

function getAll(callback){
	fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
		if (err){
			return callback(err, null);
		}
		let taskList = JSON.parse(fileContents);
		return callback(null, taskList);
	});
}

module.exports = {
	getAll
};