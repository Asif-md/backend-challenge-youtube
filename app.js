const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.SERVER_PORT || 4000;
const routes = require('./routes/index');
const FetchYoutubeData = require(`./controllers/youtubeController`);

const app = express();

const username = 'mohammedasif';
const password = 'asif123';
const cluster = 'cluster0.6roxi';
const dbname = 'youtubedb';

// established mongoDB connection with mongoDB Cluster
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Mongo DB connected successfully');
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// To enable CORS => (Cross Origin Resource Sharing)
app.use(cors());

// Starting points for the routes
app.use('/api/', routes);

// this function runs in every 10 seconds to get the videos from the youtube service
setInterval(() => {
  console.log('Calling API every 10 seconds');
  FetchYoutubeData.getVideos(undefined, null);
}, 10000);

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
