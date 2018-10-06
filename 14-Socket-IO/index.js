var app = require('express')();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('clientMessage', function(msg){
    io.emit('serverMessage', msg);
  });
});

httpServer.listen(3000, function(){
  console.log('listening on *:3000');
});
