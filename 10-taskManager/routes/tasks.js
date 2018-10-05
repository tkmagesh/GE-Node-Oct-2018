var express = require('express'),
	router = express.Router(),
	taskService = require('../services/taskService');

router.get('/', function(req, res, next){
	//res.json(taskService.getAll());
	taskService.getAll(function(err, taskList){
		if (err){
			res.status(500).end();
			return;
		}
		res.json(taskList);
	});
});

router.get('/:id', function(req, res, next){
	var taskIdToFind = parseInt(req.params.id);
	try{
		var resultTask = taskService.get(taskIdToFind);
		res.json(resultTask);
	} catch (err){
		res.status(404).end();
	}
	
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	var newTask = taskService.addNew(newTaskData);
	res.status(201).json(newTask);
});

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTask = req.body;
	try {
		taskService.update(taskIdToUpdate, updatedTask);
		res.json(updatedTask);
	} catch (err){
		res.status(404).end();
	}	
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);

	try{
		taskService.remove(taskIdToDelete);
		res.json({});
	}
	catch (err){
		res.status(404).end();
	}
});

module.exports = router;
