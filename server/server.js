const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{

	socket.on('join',(params,callback)=>{
		socket.join(params.room);

		console.log("New user connected");
		socket.broadcast.to(params.room).emit('statusMessage',{
			"text":"Someone has joined the chat"
		});

		socket.on('disconnect',()=>{
			console.log("User disconnected");
			socket.broadcast.to(params.room).emit('statusMessage',{
				"text":"Someone has left the chat"
			});
		});

		socket.on('createMessage',(data)=>{
			console.log("Create message");
			var time = new Date().getTime();
			socket.broadcast.to(params.room).emit('newMessage',{
				"from":data.from,
				"text":data.text,
				"createdAt": time
			});
			socket.emit('userMessage',{
				"from":"Me",
				"text":data.text,
				"createdAt": time
			});
		});
	});
});

server.listen(3000,()=>{
	console.log("Listening on port 3000");
});