//==============================================================================
// ■ Reddit-Tasks (reddit/tasks.js)
//------------------------------------------------------------------------------
//     Reddit Posting Tasks.
//==============================================================================

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { tasks: tasks() };

//------------------------------------------------------------------------------
// ● Random-Artwork-Tasks
//------------------------------------------------------------------------------
function tasks() {
  return [
    {
      subreddit: "TheRiseOfMyPower",
      post: { format: "{title}, by me", oc: true, flairs: ["Artwork"] },
      schedule: { every: hours(5) },
    },

    // {
    //   subreddit: "Art",
    // },

    // {
    //   subreddit: "SpecArt",
    // },

    // {
    //   subreddit: "drawing",
    // },

    // {
    //   subreddit: "conceptart",
    // },

    // {
    //   subreddit: "ArtBuddy",
    // },

    // {
    //   subreddit: "IDAP",
    // },

    // {
    //   subreddit: "Illustration",
    // },

    // {
    //   subreddit: "pics",
    // },
  ];
}
