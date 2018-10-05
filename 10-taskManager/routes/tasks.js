var express = require('express'),
	router = express.Router();

var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Plan vacation', isCompleted : true}
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

module.exports = router;
