var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
    id: 1,
    desctription: 'How to be rich',
    completed: false
}, {
    id: 2,
    desctription: "How to be a king!",
    completed: true
}]


var data = [{
    id: 1,
    name: 'RatanakPek',
    school: 'HRD'
}]

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


app.listen(PORT, function () {
    console.log('Port number : ' + PORT);
})