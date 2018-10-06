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

function save(data, callback){
	fs.writeFile(dbFile, JSON.stringify(data), 'utf8', callback);
}

module.exports = {
	getAll,
	save
};