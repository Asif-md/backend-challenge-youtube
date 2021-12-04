const YOUTUBEService = require(`../services/YOUTUBEService`);

module.exports = {
  getVideos: (req, res) => {
    YOUTUBEService.getVideos()
      .then((data) => {
        const obj = JSON.parse(data);
        console.log('data', data);
        const arr = obj && obj.items;

        for (let i = 0; i < arr.length; i++) {
          const element = arr[i];
          console.log(element);
        }

        res.status(200).send(obj);
      })
      .catch((err) => {
        res.send(err.message);
      });
  },
};
