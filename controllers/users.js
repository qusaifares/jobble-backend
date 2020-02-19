const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

router.get('/', (req, res) => {
  User.find({}).then(data => res.json(data.map(user => user.id)));
});

// Changed route from /login/:username
router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username }).then(data => res.json(data));
});

router.post('/create', (req, res) => {
  console.log('THE BODY IS', req.body);
  User.create({
    username: req.body.username,
    savedJobs: [],
    discardedJobs: []
  }).then(user => res.json(user));
});

// When calling the /save/:jobID route, provide the username in the request body
// Then, for that user record,
// - Add the jobID to savedJobs
router.put('/save/:jobID', (req, res) => {
  const filter = { username: req.body.username };
  const update = { $push: { savedJobs: jobID } };
  User.findOneAndUpdate(filter, update, { new: true });
});

// - Add the jobID to discardedJobs
router.post('/discard/:jobID', (req, res) => {
  const filter = { username: req.body.username };
  const update = { $push: { discardedJobs: jobID } };
  User.findOneAndUpdate(filter, update, { new: true });
});

module.exports = router;
