const request = require(`request`);
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';

const API_KEY = 'AIzaSyDbyqgzFdb1GM3dOSLzkJL4owTrlhK8w0Y';

module.exports = {
  getVideos: () => {
    let headers = {
      'content-type': 'application/json',
    };
    return new Promise(async (resolve, reject) => {
      let URL = `${BASE_URL}search?key=${API_KEY}&type=video&part=snippet&maxResults=10&q=`;

      await request.get(
        URL,
        {
          headers,
        },
        async (err, response, body) => {
          console.log(body);
          if (err) {
            await reject(err);
          } else if (response && response.statusCode === 200) {
            await resolve(response.body);
          } else {
            await reject(body);
          }
        },
      );
    });
  },
};
