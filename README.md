# Jobble

A job finding app built with the MERN stack.

Front End: https://github.com/javascriptures/jobble-frontend

## API

Automated testing with 5/5 passed.

Deployed with Atlas and Heroku.

https://customercrmma.herokuapp.com/customers

### Users

#### 1. `GET /users`

- Returns all user id's

#### 2. `GET /users/:username`

- Returns data for an individual user selected by their username

#### 3. `POST /users/create`

- Creates a new user

#### 4. `PUT /users/save/:jobID`

- Adds a job to the `savedJobs` array in the user object

#### 5. `PUT /users/discard/:jobID`

- Adds a job ID to the `discardedJobs` array in the user object

### Jobs

#### 1. `GET /jobs`

- Returns all jobs in mongo database

#### 2. `GET /jobs/:id`

- Returns a job by its ID

#### 3. `GET /jobs/refresh`

- Fetches jobs from the GitHub Jobs API and stores it in Mongo

#### 4. `GET /jobs/search`

- Returns array of jobs by search criteria
