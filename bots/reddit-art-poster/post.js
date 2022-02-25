///==============================================================================
// ■ Reddit-Art-Poster-Post (reddit-art-poster/post.js)
//------------------------------------------------------------------------------
//     A class representing a reddit artwork post.
//==============================================================================

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = class Post {
  title = "{0}";
  oc = false;
  flairs = [];

  constructor(post = {}) {
    const { title, oc, flairs } = post;
    if (title) this.title = title.trim();
    if (oc) this.oc = oc;
    if (flairs && flairs.length) this.flairs = flairs;
  }

  formattedTitle(values = []) {
    let { title } = this;
    for(let i = 0; i < values.length; i++){
      title = title.replace(`{${i}}`, values[i]);
    }
    return title.replace(/{\d+}/g, "...");
  }

  toString() {
    const titleText = `"${this.title}"`;
    const ocText = this.oc ? "OC" : "!OC";
    const flairsText = `[${this.flairs}]`;
    return `${titleText}, ${ocText}, ${flairsText}`;
  }
};
