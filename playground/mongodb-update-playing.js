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
    const Todos = db.collection('Users');

    // FindOneANdUpdate!
    Todos.findOneAndUpdate({
        name: "Fernando Nakamuta"
    }, {
        $inc: {
            age: 3
        },
        $set: {
            location: "Tokyo"
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log('Document Updated Successfully.');
        console.log(result);
    });

});
