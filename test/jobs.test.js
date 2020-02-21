const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('https://jobble-backend.herokuapp.com');

describe('GET /jobs', () => {
  it('should return a 200 response', done => {
    api
      .get('/jobs')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects ', done => {
    api
      .get('/jobs')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.forEach(job => {
          expect(job).to.be.an('object');
        });
        done();
      });
  });
});

describe('GET /jobs/:id', () => {
  const id = '5e4f98b54ed6f00004e84a9a'; // Change when seeding

  it('should return a 200 response', done => {
    api
      .get(`/jobs/${id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .get(`/jobs/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should have id, type, url, title, location properties', done => {
    api
      .get(`/jobs/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.include.all.keys(
          'id',
          'type',
          'url',
          'title',
          'location'
        );
        done();
      });
  });
});
