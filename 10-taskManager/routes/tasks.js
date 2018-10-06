var express = require('express'),
	router = express.Router(),
	taskService = require('../services/taskService');

router.get('/', async function(req, res, next){
	//res.json(taskService.getAll());
	/*taskService.getAll(function(err, taskList){
		if (err){
			
			return;
		}
		res.json(taskList);
	});*/

	
	taskService
		.getAll()
		.then(function(taskList){
			res.json(taskList);
		})
		.catch(function(err){
			res.status(500).end();
		});
});

router.get('/:id', async function(req, res, next){
	var taskIdToFind = parseInt(req.params.id);
	try	{
		var resultTask = await taskService.get(taskIdToFind);
		res.json(resultTask);
	} catch(error){
		res.status(404).end();	
	}
});


router.post('/', function(req, res, next){
	var newTaskData = req.body;
	taskService
		.addNew(newTaskData)
		.then(function(newTask){
			res.status(201).json(newTask);	
		});
	
});

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTask = req.body;
	
	taskService
		.update(taskIdToUpdate, updatedTask)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			res.status(404).end();
		});
});

router.patch('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTaskData = req.body;
	
	taskService
		.partialUpdate(taskIdToUpdate, updatedTaskData)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			res.status(404).end();
		});
});



router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);

	taskService
		.remove(taskIdToDelete)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			res.status(404).end();
		});
});

module.exports = router;
