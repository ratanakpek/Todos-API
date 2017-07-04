var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var todos=[];
var todoNextId=1;

// var todos = [{
//     id: 1,
//     desctription: 'How to be rich',
//     completed: false
// }, {
//     id: 2,
//     desctription: "How to be a king!",
//     completed: true
// }]
//
//
// var data = [{
//     id: 1,
//     name: 'RatanakPek',
//     school: 'HRD'
// }]


app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Todo API Root!')
});

app.get('/todos', function (req, res) {
    res.send(todos);
})

app.get('/todos/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var match;

    todos.forEach(function (todo) {
        if (id === todo.id) {
            match=todo;

        }
    });

    if(match){
        res.json(match);
    }else{
        res.status(404).send();
    }

})

app.get('/data', function (req, res) {
    res.json(data);
})


//**************************post************************
app.post('/todos', function(req, res){
   var body = req.body;
   console.log('description'+body.id);
   body.id=todoNextId++;

   todos.push(body);
   res.json(body);
});


app.listen(PORT, function () {
    console.log('Port number : ' + PORT);
})