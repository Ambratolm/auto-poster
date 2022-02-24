///==============================================================================
// ■ Reddit-Art-Poster-Post (reddit-art-poster/post.js)
//------------------------------------------------------------------------------
//     A class representing a reddit artwork post.
//==============================================================================

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = class Post {
  title = "{artwork-title}";
  oc = false;
  flairs = [];

  constructor(post = {}) {
    const { title, oc, flairs } = post;
    if (title) this.title = title;
    if (oc) this.oc = oc;
    if (flairs && flairs.length) this.flairs = flairs;
  }

  formatTitle(tokens = {}) {
    const { artworkTitle } = tokens;
    this.title = this.title
      .replace("{artwork-title}", artwork.title)
      .replace("{random-year}", random(2020, dayjs().year()));
    return this.title;
  }

  toString() {
    const titleText = `"${this.title}"`;
    const ocText = this.oc ? "OC" : "!OC";
    const flairsText = `[${this.flairs}]`;
    return `${titleText}, ${ocText}, ${flairsText}`;
  }
};
