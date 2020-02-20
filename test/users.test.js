const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('https://jobble-backend.herokuapp.com');

describe('GET /users', () => {
  it('should return a 200 response', done => {
    api
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
      });
    done();
  });

  it('should return an array of strings ', done => {
    api
      .get('/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.forEach(user => {
          expect(user).to.be.a('string');
        });
        done();
      });
  });
});

describe('GET /users/:id', () => {
  const id = '5e4d82beaa14280004088aff';

  it('should return a 200 response', done => {
    api
      .get(`/users/${id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .get(`/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should have id, username properties', done => {
    api
      .get(`/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.have.property('username');
      });
    done();
  });
});
