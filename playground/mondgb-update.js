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

    // FindOneANdUpdate!
    Todos.findOneAndUpdate({
        _id: new ObjectID('5b13791746c3a445a5afb2d7')
    },{
        $set: {
            completed: true
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log('Document Updated Successfully.');
        console.log(result);
    });

});
