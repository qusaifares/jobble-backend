const mongoose = require('../connection');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  unsavedJobs: { type: Array }, // List of jobs from search
  savedJobs: { type: Array }, // Contains objects to be saved to user's database
  discardedJobs: { type: Array } // Contains IDs of jobs to be filtered out of future searches
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
