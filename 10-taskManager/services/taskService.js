var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Plan vacation', isCompleted : true}
];

function getAll(){
	return [...taskList];
}

function get(taskIdToFind){
	var resultTask = taskList.find(function(task){
		return task.id === taskIdToFind;
	});

	if (!resultTask){
		throw new Error('Task not found');
	}
	return resultTask;
}

function addNew(newTaskData){
	newTaskData.id = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskList.push(newTaskData);
	return newTaskData;
}

function update(taskIdToUpdate, updatedTask){
	var taskToReplace = taskList.find(function(task){
		return task.id === taskIdToUpdate;
	});

	if (!taskToReplace){
		throw new Error('Task not found');
	}

	taskList = taskList.map(function(task){
		return task.id === taskIdToUpdate ? updatedTask : task;
	});

	return updatedTask;
}

function remove(taskIdToDelete){
	var taskToDelete = taskList.find(function(task){
		return task.id === taskIdToDelete;
	});

	if (!taskToDelete){
		throw new Error('Task not found');
	}
	taskList = taskList.filter(function(task){
		return task.id !== taskIdToDelete;
	});
}

module.exports = {
	getAll,
	get,
	addNew,
	update,
	remove
}