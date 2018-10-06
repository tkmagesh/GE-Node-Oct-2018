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
	taskService.get(taskIdToFind, function(err, resultTask){
		if (!err){
			res.json(resultTask);
		} else {
			res.status(404).end();	
		}
	});	
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	taskService.addNew(newTaskData, function(err, newTask){
		res.status(201).json(newTask);	
	});
	
});

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTask = req.body;
	
	taskService.update(taskIdToUpdate, updatedTask, function(err, result){
		if (err){
			res.status(404).end();
		} else {
			res.json(result);
		}
	});
});

router.patch('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTaskData = req.body;
	
	taskService.partialUpdate(taskIdToUpdate, updatedTaskData, function(err, result){
		if (err){
			res.status(404).end();
		} else {
			res.json(result);
		}
	});
});



router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);

	taskService.remove(taskIdToDelete, function(err){
		if (!err){
			res.json({});
		} else {
			res.status(404).end();	
		}
	});
});

module.exports = router;
