var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database on mlab.com
mongoose.connect('mongodb://<login>:<password>@<database>.mlab.com:11788/my-todo-db')

// create a schema for DB
var todoSchema = new mongoose.Schema({
  item: String
})

// create model based on todoSchema
var Todo = mongoose.model('Todo', todoSchema);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// var data = [
//     {item: 'get milk'},
//     {item: 'walk dog'},
//     {item: 'write some code'},
//   ];

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    // get all data from mongoDB and pass to the view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', {todos: data});
    })
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    // get data from view and add to DB
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req, res) {
    // delete requested item from DB
    Todo.find({ item: req.params.item}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

};
