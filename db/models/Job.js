const mongoose = require('../connection');

const JobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  created_at: { type: String, required: false },
  company: { type: String, required: true },
  company_url: { type: String, required: false },
  location: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  how_to_apply: { type: String },
  companyLogo: { type: String }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
