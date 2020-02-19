const mongoose = require('./connection');
const User = require('./models/User');
const Job = require('./models/Job');
const users = require('./users.json');
const jobs = require('./jobs-short.json');

User.deleteMany({})
  .then(() => {
    return User.collection.insertMany(users);
  })
  .then(() => {
    process.exit();
  });

Job.deleteMany({})
  .then(() => {
    return Job.collection.insertMany(jobs);
  })
  .then(() => {
    process.exit();
  });
