# Jobble Back End

Front End Repo: https://github.com/javascriptures/jobble-frontend

Front End Deployment: https://jobble-frontend.herokuapp.com/

Back End Deployment: http://jobble-backend.herokuapp.com/

## Jobble API

### Users

#### 1. `GET /users`

- Return all user id's

#### 2. `GET /users/all`

- Return all user id's and usernames

#### 3. `GET /users/:userID`

- Return document of the individual user whose MongoID is :userID

#### 4. `GET /users/username/:username`

- Return document of the individual user whose username is :username

#### 5. `POST /users/login`

- Return the user whose username is contained in the body of the request

#### 6. `POST /users/create`

- Create a new user with username :username
- Body should contain username in JSON format

#### 7. `POST /users/delete/:userID`

- Delete the user whose Mongo ObjectID is :userID

#### 8. `PUT /users/:userID/save/:jobID`

- Add a job ID to the `savedJobs` array in the user's document

#### 9. `PUT /users/:userID/discard/:jobID`

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
