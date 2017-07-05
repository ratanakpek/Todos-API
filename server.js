var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var _=require('underscore');

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
    var todoId = parseInt(req.params.id, 10);
    // var match;
    //
    // todos.forEach(function (todo) {
    //     if (id === todo.id) {
    //         match=todo;
    //
    //     }
    // });


    //underscore
    var matchedTodo=_.findWhere(todos, {id:todoId});

    if(matchedTodo){
        res.json(matchedTodo);
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

var i=1;
var datas=[];
app.post('/apis', function(req, res){
    var body = req.body;

    body.stu_id=i++;

    datas.push(body);
    res.send(body);


})



app.get('/api/:id', function(req, res){
    var tid= parseInt(req.params.id, 10);
    var match;
    datas.forEach(function(d){
        if(tid === d.stu_id){
            match=d;
            console.log('equal');
        }
        console.log('Not equal');
    })

    if(match){
        res.json(match);
    }else{
        res.status(404).send();
    }

});


app.listen(PORT, function () {
    console.log('Port number : ' + PORT);
})