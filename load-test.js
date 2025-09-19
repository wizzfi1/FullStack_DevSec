const axios = require("axios");

const urls = [
  "https://mydev-staging.onrender.com/",
  "https://mydev-staging.onrender.com/debug-sentry"
];

async function sendRequests() {
  for (let i = 0; i < 100; i++) {
    for (const url of urls) {
      axios.get(url)
        .then(res => console.log(` ${url} ${res.status}`))
        .catch(err => console.log(` ${url} ${err.response?.status || err.message}`));
    }
  }
}

sendRequests();
