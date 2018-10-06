const taskDb = require('../data/taskDb.js');

function getAll(){
	return taskDb.getAll();
}

function get(taskIdToFind){
	return taskDb
		.getAll()
		.then(function(taskList){
			var resultTask = taskList.find(function(task){
				return task.id === taskIdToFind;
			});

			if (!resultTask){
				let error = new Error('Task not found');
				return Promise.reject(error);
			}
			return resultTask;
		});
	
}

function addNew(newTaskData){
	return taskDb
		.getAll()
		.then(function(taskList){
			newTaskData.id = taskList.reduce(function(result, task){
				return result > task.id ? result : task.id;
			}, 0) + 1;
			taskList.push(newTaskData);
			return taskDb
				.save(taskList)
				.then(function(){
					return newTaskData;
				});
		});
}

function update(taskIdToUpdate, updatedTask, callback){
	return taskDb
		.getAll()
		.then(function(taskList){
			var taskToReplace = taskList.find(function(task){
				return task.id === taskIdToUpdate;
			});

			if (!taskToReplace){
				let error = new Error('Task not found');
				return Promise.reject(err);
			}

			taskList = taskList.map(function(task){
				return task.id === taskIdToUpdate ? updatedTask : task;
			});

			return taskDb
				.save(taskList)
				.then(function(){
					return updatedTask;
				});
		});		
}

function partialUpdate(taskIdToUpdate, updateData, callback){
	return taskDb
		.getAll()
		.then(function(taskList){
			var taskToReplace = taskList.find(function(task){
				return task.id === taskIdToUpdate;
			});

			if (!taskToReplace){
				let error = new Error('Task not found');
				return Promise.reject(err);
			}

			var updatedTask = {...taskToReplace, ...updateData};

			taskList = taskList.map(function(task){
				return task.id === taskIdToUpdate ? updatedTask : task;
			});

			return taskDb
				.save(taskList)
				.then(function(){
					return updatedTask;
				});
		});	
}

function remove(taskIdToDelete, callback){
	return taskDb
		.getAll()
		.then(function(taskList){
			var taskToDelete = taskList.find(function(task){
				return task.id === taskIdToDelete;
			});

			if (!taskToDelete){
				let error = new Error('Task not found');
				return Promise.reject(err);
			}
			taskList = taskList.filter(function(task){
				return task.id !== taskIdToDelete;
			});
			return taskDb
				.save(taskList)
				.then(function(){
					return {};
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