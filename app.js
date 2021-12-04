const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.SERVER_PORT || 4000;
const routes = require('./routes/index');
const app = express();

const username = 'mohammedasif';
const password = 'asif123';
const cluster = 'cluster0.6roxi';
const dbname = 'youtubedb';

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// To enable CORS => (Cross Origin Resource Sharing)
app.use(cors());
// Starting points for the routes
app.use('/api/', routes);

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
