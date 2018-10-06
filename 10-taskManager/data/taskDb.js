const fs = require('fs'),
	path = require('path');

const dbFile = path.join(__dirname, 'taskDb.json');

/*function getAll(){
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
	
}*/

/*
//using native util module to create promise wrappers for callback based functions
var util = require('util');

const readFile = util.promisify(fs.readFile),
	writeFile = util.promisify(fs.writeFile);

function getAll(){
	
	return readFile(dbFile, {encoding : 'utf8'})
			.then(function(fileContents){
				return JSON.parse(fileContents);
			});
	
}

function save(data){
	return writeFile(dbFile, JSON.stringify(data), 'utf8');
}*/

//using bluebird

var Promise = require('bluebird');
Promise.promisifyAll(fs);

function getAll(){
	
	return fs.readFileAsync(dbFile, {encoding : 'utf8'})
			.then(function(fileContents){
				return JSON.parse(fileContents);
			});
	
}

function save(data){
	return fs.writeFileAsync(dbFile, JSON.stringify(data), 'utf8');
}

module.exports = {
	getAll,
	save
};