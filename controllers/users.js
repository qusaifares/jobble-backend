const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

// Return only the _id field for all users
router.get('/', (req, res) => {
  User.find({}).then(data => res.json(data.map(user => user._id)));
});

router.get('/all', (req, res) => {
  User.find({}).then(data => res.json(data));
});

router.get('/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId }).then(data => res.json(data));
});

router.get('/savedjobs/:username', (req, res) => {
  User.findOne({ _id: req.params.username }, { savedJobs }).then(data =>
    res.json(data)
  );
});

router.get('/savedjobs/:userId', (req, res) => {
  const id = req.params.userId;
  User.findOneById({ _id: req.params.userId }).then(data => res.json(data));
});

router.get('/username/:username', (req, res) => {
  User.findOne({ username: req.params.username }).then(data => res.json(data));
});

router.get('/login/:username', (req, res) => {
  User.findOne({ username: req.params.username }).then(data => res.json(data));
});

router.get('/login', (req, res) => {
  User.findOne({ username: req.body.username }).then(data => res.json(data));
});

router.post('/create', (req, res) => {
  User.create({ username: req.body.username })
    .then(user => res.json(user))
    .catch(console.error);
});

router.delete('/delete/:userID', (req, res) => {
  User.findOneAndRemove({ _id: req.params.userID })
    .then(user => res.json(user))
    .catch(console.error);
});

router.put('/:userID/save/:jobID', (req, res) => {
  const filter = { _id: req.params.userID };
  const update = { $push: { savedJobs: req.params.jobID } };
  const options = { new: true };
  User.findOneAndUpdate(filter, update, options)
    .then(user => res.json(user))
    .catch(console.error);
  // Now I need to remove the jobID from unsavedJobs:
});

router.put('/:userID/discard/:jobID', (req, res) => {
  const filter = { _id: req.params.userID };
  const update = { $push: { discardedJobs: req.params.jobID } };
  const options = { new: true };
  User.findOneAndUpdate(filter, update, options)
    .then(user => res.json(user))
    .catch(console.error);
  // Now I need to remove the jobID from unsavedJobs:
});

module.exports = router;
