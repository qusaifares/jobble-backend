const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

// Return only the _id field for all users
router.get('/', (req, res) => {
  User.find({}).then(data => res.json(data.map(user => user._id)));
});

router.get('/all', (req, res) => {
  User.find({}).then(data =>
    res.json(
      data.map(user => {
        return { _id: user._id, username: user.username };
      })
    )
  );
});

router.get('/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId }).then(data => res.json(data));
});

router.post('/create', (req, res) => {
  User.create({ username: req.body.username })
    .then(user => res.json(user))
    .catch(console.error);
});

router.post('/delete/:username', (req, res) => {
  User.findOneAndRemove({ username: req.params.username })
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
