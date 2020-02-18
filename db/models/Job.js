const mongoose = require('../connection');

const JobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: String, required: false, alias: 'created_at' },
  company: { type: String, required: true },
  companyUrl: { type: String, required: false, alias: 'company_url' },
  location: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  howToApply: { type: String, alias: 'how_to_apply' },
  companyLogo: { type: String, alias: 'company_logo' }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
