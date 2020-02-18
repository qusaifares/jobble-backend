const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jobsController = require('./controllers/jobs');
const usersController = require('./controllers/users');

app.use('/api/jobs', jobsController);
app.use('/api/users', usersController);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
