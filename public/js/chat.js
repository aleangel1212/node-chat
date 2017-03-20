var socket = io();

socket.on('connect',function(){
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function(err){
		if (err) {

		}

		else {
			
		}
	});
});

socket.on('disconnect',function(){
	console.log("Disconnected from server");
});

socket.on('newMessage',function(data){
	document.getElementById('messages').innerHTML += "<p class='newMessage'>"+data.from+": "+data.text+"</p>";
});

socket.on('userMessage',function(data){
	document.getElementById('messages').innerHTML += "<p class='userMessage'>"+data.from+": "+data.text+"</p>";
});

socket.on('statusMessage',function(data){
	document.getElementById('messages').innerHTML += "<p class='status'>"+data.text+"</p>";
});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		"from":"User",
		"text":jQuery('[name=message]').val()
	});
	jQuery('[name=message]').val('');
});