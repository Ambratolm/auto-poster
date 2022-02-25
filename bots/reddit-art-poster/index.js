//==============================================================================
// ■ Reddit-Art-Poster (reddit-art-poster/index.js)
//------------------------------------------------------------------------------
//     A bot that posts random artworks (by Ambratolm) on social media.
//==============================================================================
const Tasklist = require("./tasklist");

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = async function redditArtPoster() {
  try {
    const tasklist = new Tasklist("./tasklist.json");

    tasklist.log();
    // await tasklist.fetchSchedRefs();
    // tasklist.log();

    await tasklist.run();
  } catch(err) {
    console.error(err);
  }
};
