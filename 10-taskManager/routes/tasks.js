var express = require('express'),
	router = express.Router();

var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Plan vacation', isCompleted : true}
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

router.get('/:id', function(req, res, next){
	var taskIdToFind = parseInt(req.params.id);
	var resultTask = taskList.find(function(task){
		return task.id === taskIdToFind;
	});
	if (!resultTask){
		res.status(404);
		return;
	}
	res.json(resultTask);
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	newTaskData.id = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskList.push(newTaskData);
	res.status(201).json(newTaskData);
});

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTask = req.body;

	var taskToReplace = taskList.find(function(task){
		return task.id === taskIdToUpdate;
	});

	if (!taskToReplace){
		res.status(404);
		return;
	}
	taskList = taskList.map(function(task){
		return task.id === taskIdToUpdate ? updatedTask : task;
	});

	res.json(updatedTask);
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);

	var taskToDelete = taskList.find(function(task){
		return task.id === taskIdToDelete;
	});

	if (!taskToDelete){
		res.status(404);
		return;
	}
	taskList = taskList.filter(function(task){
		return task.id !== taskIdToDelete;
	});

	res.json({});
});





module.exports = router;
