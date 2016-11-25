var express = require('express');

// controllers
var todoController = require('./controllers/todoController')

var app = express();

// template view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen to 3000 port
app.listen(3000);
console.log('You are listening to the port 3000...')
