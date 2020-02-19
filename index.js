const express = require('express');
const app = express();
const cors = require('cors');

const jobsController = require('./controllers/jobs');
const usersController = require('./controllers/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/jobs', jobsController);
app.use('/users', usersController);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
