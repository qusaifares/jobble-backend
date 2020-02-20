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
  const id = '5e4dcde4c3e20e0004325bd4';

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

  it('should have _id, username, unsavedJobs, savedJobs, discardedJobs properties', done => {
    api
      .get(`/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('unsavedJobs');
        expect(res.body).to.have.property('savedJobs');
        expect(res.body).to.have.property('discardedJobs');
      });
    done();
  });
});

describe('POST /users/create/:username', () => {
  const username = 'jerrica';

  before(done => {
    api
      .post(`/users/create/${username}`)
      .set('Accept', 'application/json')
      .end(done);
  });

  it('should add a user', done => {
    api
      .get('/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const userToFind = res.body.find(user => user === username);
        expect(userToFind).to.be.an('object');
      });
    done();
  });
});
