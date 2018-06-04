const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');
const toDoId = '5b14bf34f39a58310f214a31';
const userId = '5b1487fd1eb899532a4b6463';

// Todo.find({
//     _id: id
// }).then((todos) => {
//     todos.length > 0 ? console.log(todos) : console.log('There are no todos');
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
    //     todo ? console.log(todo) : console.log('Id not found');
    // });

// Todo.findById(id).then((todo) => {
//     todo ? console.log(todo) : console.log('Id not found');
// });

User.findById(userId).then((user) => {
    user ? console.log('Found user :', user) : console.log('Id not found');
}, (e) => {
    console.log('Invalid ID');
});