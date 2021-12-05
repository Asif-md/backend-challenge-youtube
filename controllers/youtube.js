const YOUTUBEService = require(`../services/YOUTUBEService`);
const Youtube_Data = require('../models/YoutubeData');

module.exports = {
  getVideos: async (req, res) => {
    await YOUTUBEService.getVideos()
      .then(async (data) => {
        const obj = JSON.parse(data);
        const filterItems = obj && obj.items;

        for (let i = 0; i < filterItems.length; i++) {
          let element = filterItems[i];
          element['title'] = element.snippet.title;
          element['description'] = element.snippet.description;
          element['publishedAt'] = element.snippet.publishedAt;
          const insertData = new Youtube_Data(element);
          try {
            await insertData.save();
          } catch (error) {
            await res.status(500).send(error);
          }
        }

        if (res === null) {
          console.log('Data inserted to DB from setInterval function.');
        } else {
          await res.status(200).send(obj);
        }
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
      results.results = await Youtube_Data.find({}).sort({ publishedAt: -1 }).limit(limit).skip(skipIndex).exec();
      res.send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  searchFromDB: async (req, res) => {
    console.log(req);
    const { name } = req.params;
    let regex = new RegExp(name, 'i');

    try {
      await Youtube_Data.find()
        .or([{ title: regex }, { description: regex }])
        .exec((err, results) => {
          return res.status(200).json(results);
        });
    } catch (err) {
      return res.status(err.code).json({ error: err.error });
    }
  },
};
