const mongoose = require('mongoose');

const YoutubeSchema = new mongoose.Schema({
  kind: String,
  etag: String,
  parent_id: { kind: String, videoId: String },
  snippet: {
    publishedAt: String,
    channelId: String,
    title: String,
    description: String,
    thumbnails: {
      default: {
        url: String,
        width: Number,
        height: Number,
      },
      medium: {
        url: String,
        width: Number,
        height: Number,
      },
      high: {
        url: String,
        width: Number,
        height: Number,
      },
      channelTitle: String,
      liveBroadcastContent: String,
      publishTime: String,
    },
  },
});

const Youtube_Data = mongoose.model('Youtube_Data', YoutubeSchema);

module.exports = Youtube_Data;
