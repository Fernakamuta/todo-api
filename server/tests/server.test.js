const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('./../server');
const {Todo} = require('./../models/todo');

const ToDoFoos = [{
    _id: new ObjectID(),
    text: 'Make the test'
}, {
    _id: new ObjectID(),
    text: 'Develop the feature'
}];

// beforeEach roda antes de cada teste. 
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(ToDoFoos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo  text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(201) 
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            // No final, caso tenha dado um erro ele para por ai no primero done
            // Caso tenha dado sucesso ele procura no mongo
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a new todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400) 
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a todo doc', (done) => {
        request(app)
            .get(`/todos/${ToDoFoos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(ToDoFoos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if not found', (done) => {
        const newId = new ObjectID();
        request(app)
            .get(`/todos/${newId.toHexString()}`)
            .expect(404)
            .expect((res) => {
                expect(JSON.parse(res.text).error).toBe('Id not found').toBeA('string');
            })
            .end(done);
    });

    it('should return a 400 if not valid id', (done) => {
        request(app)
            .get('/todos/12345')
            .expect(400)
            .end(done);
    });
});