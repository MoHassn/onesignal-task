require("dotenv").config();
const OneSignal = require("onesignal-node");

const appId = process.env.APP_ID;
const apiKey = process.env.API_KEY;

console.log(appId);
console.log(apiKey);
const client = new OneSignal.Client(appId, apiKey);

async function sendNotification() {
  const notification = {
    contents: {
      tr: "Yeni bildirim",
      en: "New notification",
    },
    included_segments: ["Active Users", "Inactive Users"],
  };

  // using async/await
  try {
    const response = await client.createNotification(notification);
    console.log("response", response);
  } catch (e) {
    console.log("error", e);
    if (e instanceof OneSignal.HTTPError) {
      // When status code of HTTP response is not 2xx, HTTPError is thrown.
      console.log("error", e.statusCode);
      console.log(e.body);
    }
  }
}

// new Promise(async (res) => {
//   console.time();
//   await sendNotification();
//   console.timeEnd();
//   res();
// });

sendNotification().then(console.log).catch(console.log);
