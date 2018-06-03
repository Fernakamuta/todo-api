const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongodb Server');
    }
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp');
    const Todos = db.collection('Todos');

    // Deleting One by Id
    Todos.findOneAndDelete({
        _id: new ObjectID('5b144f103a573da7f80bac64')
    }).then((res) => {
        console.log('Document deleted.', res);
    });

    // Deleting all linear algebra
    Todos.deleteMany({
        text: "Terminar Curso Algebra Linear"
    }).then((res) => {
        console.log('Documents deleted.', res);
    });


});
