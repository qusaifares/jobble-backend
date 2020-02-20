const express = require('express');
const Job = require('../db/models/Job');
const router = express.Router();
const fetch = require('node-fetch');

// We are using the Github Jobs API:
// https://jobs.github.com/api

// For now, we are hard-coding the query to fetch:
//   - All jobs which have 'React' in the description
//   - Any location
//   - Just the first page of results (50)
const jobsURL =
  'https://jobs.github.com/positions.json?description=react&page=1';

// When they do a GET '/', it just returns all jobs from Mongo
router.get('/', (req, res) => {
  Job.find({})
    .then(jobs => {
      res.json(jobs);
    })
    .catch(console.error);
});

router.get('/:id', (req, res) => {
  Job.findById(req.params.id)
    .then(jobs => {
      res.json(jobs);
    })
    .catch(console.error);
});

// The '/refresh' route will actually call the Gihub Jobs API and load results into Mongo
// It is stubbed out for now.
// Note that when we import the data into Mongo, we need to replace the Mongo-assigned _id with
// the ID assigned by Github Jobs
// QUESTION: IS THIS THE RIGHT PLACE TO DO THAT DATA TRANSFORMATION?
// NOTE: We only want to load non-duplicate jobs into Mongo

router.get('/refresh', (req, res) => {
  fetch(jobsURL)
    .then(jobs => jobs.json())
    // .then(jobs => {
    //   Job.insertMany(jobs);
    //   console.log('inserted', jobs.length, 'jobs');
    // })
    .catch(console.error);
});

// Eventually, we want to be able to allow the user to filter their search by:
// - Keywords in the description
// - Keywords in the title
// - Location
// - Other criteria TBD
// This will require constructing a new URL to pass to fetch
// For now, just return everything (i.e. don't apply any filters)
router.get('/search', (req, res) => {
  Job.find({})
    .then(jobs => {
      res.json(jobs);
    })
    .catch(console.error);
});

module.exports = router;
