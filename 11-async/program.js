var app = (function(){
	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@Service] returning the result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	function addAsync(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@Service] returning the result`);
			callback(result);
		}, 3000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Client] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Client] result = ${result}`);	
		});
	}

	function addAsyncPromise(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);

		var promise = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning the result`);
				resolveFn(result);
			}, 3000);
		});

		return promise;
	}

	return {
		addSyncClient
		, addAsyncClient
		, addAsyncPromise
	}


})();

/*
	client

var p = app.addAsyncPromise(100,200);
p.then(function(result){
	console.log(`[@Client] result = ${result}`);
});



var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
            var doubleResult = result * 2;
			resolveFn(doubleResult);
        }, 4000);
    });
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return new Promise(function(resolveFn, rejectFn){
		var doubleResult = result * 2;
		resolveFn(doubleResult);
	});
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var doubleResult = result * 2;
	return Promise.resolve(doubleResult);
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var doubleResult = result * 2;
	return doubleResult;
});
*/
