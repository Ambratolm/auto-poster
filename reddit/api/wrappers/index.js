//==============================================================================
// ■ Reddit-API-Wrappers (reddit/api/wrappers/index.js)
//------------------------------------------------------------------------------
//     Top level wrappers in top of the used Reddit API library.
//==============================================================================

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  search: require("./search"),
  submitLink: require("./submit-link"),
  markAsOC: require("./mark-as-oc"),
  applyFlairs: require("./apply-flairs"),
  uploadMedia: require("./upload-media"),
};
