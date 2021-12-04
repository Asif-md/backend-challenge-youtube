const YOUTUBEService = require(`../services/YOUTUBEService`);
const YoutubeModel = require('../models/YoutubeData');

let newData;
module.exports = {
  getVideos: async (req, res) => {
    await YOUTUBEService.getVideos()
      .then(async (data) => {
        const obj = JSON.parse(data);
        console.log('data', data);
        const arr = obj && obj.items;

        for (let i = 0; i < arr.length; i++) {
          const element = arr[i];
          const insertData = new YoutubeModel(element);
          console.log('inserted', insertData);
          try {
            await insertData.save();
          } catch (error) {
            await res.status(500).send(error);
          }
        }

        await res.status(200).send(obj);
      })
      .catch((err) => {
        res.send(err.message);
      });
  },
  getDataFromDB: async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const results = {};

    try {
      results.results = await YoutubeModel.find({}).sort({ publishedAt: -1 }).limit(limit).skip(skipIndex).exec();
      res.send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
