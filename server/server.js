const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');


const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /TODOS
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.status(201).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /TODOS
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /TODOS/:id
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid) res.status(400).send({error : "Invalid Id"});        

    Todo.findById(id).then((todo) => {
        todo ? res.status(200).send({todo}) : res.status(404).send({error: 'Id not found'});
    }).catch((e) => {
        res.status(400).send();
    });
        
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = app;