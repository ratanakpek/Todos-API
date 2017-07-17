/**
 * Created by r.pek on 7/13/2017.
 */
var Sequelize = require('sequelize');


var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '//bring-me-book-api-phase1.sqlite'
});


var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
           len:[1, 250]
        }
    },
    completed:{
        type: Sequelize.BOOLEAN,
        allowNul:false,
        defaultValue:false
    }
});

sequelize.sync({
    force:true
}).then(function(){
    console.log('Everything is synced!')

    Todo.create({
        description: 'Hello World',
       // completed: false
    }).then(function(todo){
       return Todo.create({
           description:'Callback function!'
       })
    }).then(function(){
        return Todo.findAll({
            where:{
                completed:false
            }
        });
    }).then(function(todos){
        if(todos){
            todos.forEach(function(todo){
                console.log(todo.toJSON);
            })

        }else{
            console.log('Not Found!');
        }
    }).catch(function(e){
        console.log(e);
    })
});