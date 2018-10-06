const fs = require('fs'),
	path = require('path');

const dbFile = path.join(__dirname, 'taskDb.json');

function getAll(){
	return new Promise(function(resolveFn, rejectFn){
		fs.readFile(dbFile, { encoding : 'utf8'}, function(err, fileContents){
			if (!err){
				let taskList = JSON.parse(fileContents);
				resolveFn(taskList);	
			} else {
				rejectFn(err);
			}
		});
	});
}

function save(data){
	return new Promise(function(resolveFn, rejectFn){
		fs.writeFile(dbFile, JSON.stringify(data), 'utf8', function(err){
			if (!err){
				resolveFn();
			} else {
				rejectFn(err);
			}
		});	
	})
	
}

module.exports = {
	getAll,
	save
};