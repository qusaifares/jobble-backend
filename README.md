# Jobble Back End

Front End: https://github.com/javascriptures/jobble-frontend
Heroku: http://jobble-backend.herokuapp.com/

## Jobble API

### Users

#### 1. `GET /users`

- Return all user id's

#### 2. `GET /users/:userID`

- Return document of the individual user whose MongoID is :userID

#### 3. `POST /users/create/:username`

- Create a new user with username :username

#### 4. `POST /users/delete/:userID`

- Delete the user whose Mongo ObjectID is :userID

#### 5. `PUT /users/:userID/save/:jobID`

- Add a job ID to the `savedJobs` array in the user's document

#### 6. `PUT /users/:userID/discard/:jobID`

- Add a job ID to the `discardedJobs` array in the user's document

### Jobs

#### 1. `GET /jobs`

- Returns all jobs in mongo database

#### 2. `GET /jobs/:id`

- Returns a job by its ID

#### 3. `GET /jobs/refresh`

- Fetches jobs from the GitHub Jobs API and stores it in Mongo

#### 4. `GET /jobs/search`

- Returns array of jobs by search criteria (Currently just a placeholder which returns all jobs)
