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
        done();
      });
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

describe('GET /users/all', () => {
  it('should return a 200 response', done => {
    api
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/users/all')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects ', done => {
    api
      .get('/users/all')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.forEach(user => {
          expect(user).to.be.a('object');
        });
        done();
      });
  });
});

describe('GET /users/:id', () => {
  const id = '5e4f98b54ed6f00004e84a97'; //Change when seeding

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
        done();
      });
  });

  it('should have _id, username, unsavedJobs, savedJobs, discardedJobs properties', done => {
    api
      .get(`/users/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.include.all.keys(
          '_id',
          'username',
          'unsavedJobs',
          'savedJobs',
          'discardedJobs'
        );
        done();
      });
  });
});

describe('GET /users/username/:username', () => {
  const username = 'QusaiFares';

  it('should return a 200 response', done => {
    api
      .get(`/users/username/${username}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .get(`/users/username/${username}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should have _id, username, unsavedJobs, savedJobs, discardedJobs properties', done => {
    api
      .get(`/users/username/${username}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.include.all.keys(
          '_id',
          'username',
          'unsavedJobs',
          'savedJobs',
          'discardedJobs'
        );
        done();
      });
  });
});

describe('POST /users/create', () => {
  const username = 'Jerrica';
  before(done => {
    api
      .post(`/users/create`)
      .set('content-type', 'application/json')
      .send({ username: username })
      .set('Accept', 'application/json')
      .end((err, res) => {
        done();
      });
  });

  it('should add a user', done => {
    api
      .get('/users/all')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const userToFind = res.body.find(user => user.username === username);

        expect(userToFind).to.be.an('object');
        done();
      });
  });
});

describe('DELETE /users/delete/:userID', () => {
  let userId;
  before(done => {
    api
      .get(`/users/username/Jerrica`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        userId = res.body._id;
        done();
      });
  });

  before(done => {
    api
      .delete(`/users/delete/${userId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        done();
      });
  });

  it('should delete a user', done => {
    api
      .get('/users/all')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const userToFind = res.body.find(user => user._id == userId);

        expect(userToFind).to.be.undefined;
        done();
      });
  });
});

describe('PUT /users/save/:jobID', () => {
  const idToPut = '5e4f98b54ed6f00004e84a97'; //Change when seeding
  const jobToSave = 'testJob';
  let savedJobsLength;
  before(done => {
    api
      .get(`/users/${idToPut}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        savedJobsLength = res.body.savedJobs.length;
        done();
      });
  });

  before(done => {
    api
      .put(`/users/${idToPut}/save/${jobToSave}/`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        done();
      });
  });

  it('savedJobs array length should increase by 1', done => {
    api
      .get(`/users/${idToPut}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.savedJobs.length).to.equal(savedJobsLength + 1);
        done();
      });
  });
});

describe('PUT /users/discard/:jobID', () => {
  const idToPut = '5e4f98b54ed6f00004e84a97'; //Change when seeding
  const jobToDiscard = 'testJob';
  let discardedJobsLength;
  before(done => {
    api
      .get(`/users/${idToPut}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        discardedJobsLength = res.body.discardedJobs.length;
        done();
      });
  });

  before(done => {
    api
      .put(`/users/${idToPut}/discard/${jobToDiscard}/`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        done();
      });
  });

  it('discardedJobs array length should increase by 1', done => {
    api
      .get(`/users/${idToPut}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.discardedJobs.length).to.equal(discardedJobsLength + 1);
        done();
      });
  });
});
