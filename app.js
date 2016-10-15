var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://test:test@ds048319.mlab.com:48319/todo');
var urlencodedParser=bodyParser.urlencoded({'extended':false});
app.use(bodyParser.json()); 						
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static('./files'));
var todoSchema = new mongoose.Schema({
	item: String
});
var Todo = mongoose.model('Todo', todoSchema)

app.get('/collections/todos', function(request, response){

	Todo.find(function(error,todos){
	if (error) response.send(error);
	else {response.json(todos)};
	});	

}); 
app.get('*', function(request,response){
	if(request.url == '/') {
	response.sendFile('./files/index.html');
	} else {
		response.send('verboden, ga terug')
	}
});
app.post('/collections/todos', urlencodedParser,
 function(request, response){
		Todo.create({item : request.body.item},
		 function(error,todo){
		if (error) response.send(error);
		Todo.find(function(error,todos){
			if(error) response.send(error);
			else{response.json(todos);}
		});
	});

});
app.delete('/collections/todos/:item',function(request,response){
	Todo.remove({
		item : request.params.item},
		function(error,todo){
		if(error)response.send(error);
		Todo.find(function(error, todos){
			if(error)response.send(error);
			else {response.json(todos)}
		})
	});
});
app.delete('/api/todos/:item',function(request,response){
	Todo.remove({
		item : request.params.item},
		function(error,todo){
		if(error)response.send(error);

		Todo.find(function(error, todos){
			if(error)response.send(error);
			else {response.json(todos)}
		})
	});
});

app.listen(8080);
console.log('listening on 8080')