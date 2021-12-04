const YOUTUBEService = require(`../services/YOUTUBEService`);
const YoutubeModel = require('../models/YoutubeData');

module.exports = {
  getVideos: async (req, res) => {
    await YOUTUBEService.getVideos()
      .then(async (data) => {
        const obj = JSON.parse(data);
        const filterItems = obj && obj.items;

        for (let i = 0; i < filterItems.length; i++) {
          const element = filterItems[i];
          const insertData = new YoutubeModel(element);
          try {
            await insertData.save();
          } catch (error) {
            await res.status(500).send(error);
          }
        }

        await res.status(200).send(obj);
      })
      .catch((err) => {
        console.log(err.message);
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
