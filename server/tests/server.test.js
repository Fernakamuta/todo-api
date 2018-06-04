const expect = require('expect');
const request = require('supertest');

const app = require('./../server');
const {Todo} = require('./../models/todo');

// beforeEach roda antes de cada teste. 
beforeEach((done) => {
    Todo.remove({}).then(() => done());
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});