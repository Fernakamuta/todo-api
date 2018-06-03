const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongodb Server');
    }
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp');
    const Todos = db.collection('Todos');


    // # DELETE MANY
    // Todos.deleteMany({
    //     _id: new ObjectID('5b1378831594a94528826aaf')
    // }).then((res) => {
    //     console.log(res.result);

    // }, (err) => {
    //     console.log('Unable to delete document', err);
    // });
    
    // client.close(() => {
    //     console.log('Connection close');
    // });

    // # DELETE ONE
    // Todos.deleteOne({
    //     text: "Terminar Curso Algebra Linear"
    // }).then((res) => {
    //     console.log('Document successfully deleted');
    // });

    // FINDONE AND DELETE
    // Todos.findOneAndDelete({
    //     text: "Terminar Curso Algebra Linear"
    // }).then((result) => {
    //     console.log('Deleted Successfully!');
    //     console.log(result);
    // });



});
