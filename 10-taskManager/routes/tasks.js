var express = require('express'),
	router = express.Router();

var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Plan vacation', isCompleted : true}
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	newTaskData.id = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskList.push(newTaskData);
	res.status(201).json(newTaskData);
});

module.exports = router;
