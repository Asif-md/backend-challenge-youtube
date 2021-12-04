const request = require(`request`);
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';
const axios = require('axios');

const API_KEY = 'AIzaSyDbyqgzFdb1GM3dOSLzkJL4owTrlhK8w0Y';

module.exports = {
  getVideos: () => {
    let headers = {
      'content-type': 'application/json',
    };
    return new Promise((resolve, reject) => {
      //   let URL = `${BASE_URL}search/${type}/?query=${searchQuery}&api_key=${API_KEY}`;
      let URL = `${BASE_URL}search?key=${API_KEY}&type=video&part=snippet&maxResults=10&q=`;

      request.get(
        URL,
        {
          headers,
        },
        (err, response, body) => {
          console.log(body);
          if (err) {
            reject(err);
          } else if (response && response.statusCode === 200) {
            resolve(response.body);
          } else {
            reject(body);
          }
        },
      );
    });
  },
};
