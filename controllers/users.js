const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

// Return only the _id field for all users
router.get('/', (req, res) => {
  User.find({}).then(data => res.json(data.map(user => user.id)));
});

router.get('/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId }).then(data => res.json(data));
});

router.post('/create/:username', (req, res) => {
  User.create({
    username: req.params.username,
    unSavedJobs: [],
    savedJobs: [],
    discardedJobs: []
  })
    .then(user => res.json(user))
    .catch(console.error);
});

router.put('/:userID/save/:jobID', (req, res) => {
  const filter = { _id: req.params.userID };
  const update = { $push: { savedJobs: req.params.jobID } };
  User.findOneAndUpdate(filter, update).then(user => res.json(user));
  // Now I need to remove the jobID from unsavedJobs:
});

// - Add the jobID to discardedJobs
router.post('/:userID/discard/:jobID', (req, res) => {
  const filter = { _id: req.params.userID };
  const update = { $push: { discardedJobs: jobID } };
  User.findOneAndUpdate(filter, update, { new: true });
});

module.exports = router;
