const mongoose = require('./connection');
const User = require('./models/User');
const Job = require('./models/Job');
const users = require('./users-heroku.json');
const jobs = require('./jobs.json');

User.deleteMany({})
  .then(() => {
    return User.collection.insertMany(users);
  })
  .then(() => {
    Job.deleteMany({})
      .then(() => {
        return Job.collection.insertMany(jobs);
      })
      .then(() => {
        process.exit();
      });
  });
