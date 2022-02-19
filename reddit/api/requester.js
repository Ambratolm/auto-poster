//------------------------------------------------------------------------------
// ● Requester
//------------------------------------------------------------------------------
const snoowrap = require("snoowrap");
module.exports = new snoowrap({
  userAgent: "Ambratolm-Bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});