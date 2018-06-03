const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Unable to connect to Mongodb Server');
	}
	console.log('Connected to Mongodb Server');
	const db = client.db('TodoApp');

	const Users = db.collection('Users');
	const Todos = db.collection('Todos');

	// db.collection('Users').find({
	// 	_id: new ObjectID('5b137be57a7b7947b826ad95')
	// }).toArray().then((docs) => {
	// 	console.log('Document found!');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to find document ', err);
	// });


	// db.collection('Todos').find({completed: true}).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to  fetch Todos');
	// });

	
	// db.collection('Users').insertOne({
	// 	name: 'Carlos Nakamuta',
	// 	age: 54,
	// 	location: 'SP'
	// }, (err, res) => {
	// 	if (err) {
	// 		return console.log('Unable to inser user', err);
	// 	}
	// 	console.log(JSON.stringify(res.ops, undefined, 2));
	// });

	// Todos.count().then((count) => {
	// 	console.log('Todos count: ', count);
	// }, (err) => {
	// 	console.log('Unable to get Todos count');
	// })

	Users.find({family: "Nakamuta"}).count().then((count) => {
		console.log('Nakamuta count:', count);
	}, (err) => {
		console.log('Unable to get nakamuta count');
	});

	client.close(() => {
		console.log('Connection close');
	});

});


