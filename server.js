var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var _=require('underscore');

var todos=[];
var todoNextId=1;




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

var obj=[];
var j=1;
app.post('/insert', function(req, res){
    var body= _.pick(req.body,  'desc', 'complete')

    body.id=i++;

    obj.push(body);
    console.log(obj);
    res.send(obj);
});

app.get('/select', function (req, res) {
    // var body = req.body;
    res.send(obj);
})

//Delete data
app.delete('/delete/:id', function(req, res){
    var toid = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(obj, {id:toid})
   if(!matchedTodo){
        res.status(404).json({"error": "Not found!"});
    }else{
       obj = _.without(obj, matchedTodo)
       res.json(matchedTodo)
   }


});



app.put('/update/:id', function(req, res){

    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(obj, {id:todoId});


    var body = _.pick(req.body, 'desc', 'complete');
    var validateAttr={};

    if(!matchedTodo){
        return res.status(404).send();
    }

    if(body.hasOwnProperty('complete') && _.isBoolean(body.complete) ){
        validateAttr.complete= body.complete;

    }else if(body.hasOwnProperty('complete')){
        return res.status(400).send();
    }
        debugger;
    if(body.hasOwnProperty('desc') && _.isString(body.desc)  && body.desc.length>0){
        validateAttr.desc= body.desc;
    }else if(body.hasOwnProperty('desc')){
        return res.status(400).send();
    }


    _.extend(matchedTodo, validateAttr);

res.json(matchedTodo);

});


app.listen(PORT, function () {
    console.log('Port number : ' + PORT);
})