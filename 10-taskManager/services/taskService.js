const taskDb = require('../data/taskDb.js');

function getAll(callback){
	taskDb.getAll(function(err, taskList){
		callback(err, taskList);
	})
}

function get(taskIdToFind, callback){
	taskDb.getAll(function(err, taskList){
		var resultTask = taskList.find(function(task){
			return task.id === taskIdToFind;
		});

		if (!resultTask){
			let error = new Error('Task not found');
			return callback(error);
		}
		return callback(null, resultTask);
	})
	
}

function addNew(newTaskData, callback){
	taskDb.getAll(function(err, taskList){
		newTaskData.id = taskList.reduce(function(result, task){
			return result > task.id ? result : task.id;
		}, 0) + 1;
		taskList.push(newTaskData);
		taskDb.save(taskList, function(err){
			if (err){
				return callback(err);
			}
			return callback(null, newTaskData);
		});
	});
}

function update(taskIdToUpdate, updatedTask, callback){
	taskDb.getAll(function(err, taskList){
		var taskToReplace = taskList.find(function(task){
			return task.id === taskIdToUpdate;
		});

		if (!taskToReplace){
			let error = new Error('Task not found');
			return callback(err);
		}

		taskList = taskList.map(function(task){
			return task.id === taskIdToUpdate ? updatedTask : task;
		});

		taskDb.save(taskList, function(err){
			if (err){
				return callback(err);
			}
			callback(null, updatedTask);
		});
	});
		
}

function partialUpdate(taskIdToUpdate, updateData, callback){
	taskDb.getAll(function(err, taskList){
		var taskToReplace = taskList.find(function(task){
			return task.id === taskIdToUpdate;
		});

		if (!taskToReplace){
			let error = new Error('Task not found');
			return callback(err);
		}

		var updatedTask = {...taskToReplace, ...updateData};

		taskList = taskList.map(function(task){
			return task.id === taskIdToUpdate ? updatedTask : task;
		});

		taskDb.save(taskList, function(err){
			if (err){
				return callback(err);
			}
			callback(null, updatedTask);
		});
	});
		
}

function remove(taskIdToDelete, callback){
	taskDb.getAll(function(err, taskList){
		var taskToDelete = taskList.find(function(task){
			return task.id === taskIdToDelete;
		});

		if (!taskToDelete){
			let error = new Error('Task not found');
			return callback(error);
		}
		taskList = taskList.filter(function(task){
			return task.id !== taskIdToDelete;
		});
		taskDb.save(taskList, function(err){
			if (err){
				return callback(err);
			}
			callback(null);
		});
	});
}

module.exports = {
	getAll,
	get,
	addNew,
	update,
	partialUpdate,
	remove
}