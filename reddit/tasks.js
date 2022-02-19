//==============================================================================
// ■ Reddit-Tasks (reddit/tasks.js)
//------------------------------------------------------------------------------
//     Reddit Posting Tasks.
//==============================================================================

module.exports = [
  {
    subredditName: "TheRiseOfMyPower",
    post: { title: "{title}, by me", oc: true, flairs: ["Artwork"] },
    schedule: { every: global.days(1) },
  },

  {
    subredditName: "Art",
    post: { title: "{title}, me, mix, 2021", oc: true, flairs: ["Artwork"] },
    schedule: { every: global.days(2) },
  },

  {
    subredditName: "SpecArt",
    post: { title: "{title}, by me" },
    schedule: { every: global.days(1) },
  },

  {
    subredditName: "drawing",
    schedule: { every: global.days(1) },
  },

  {
    subredditName: "conceptart",
    schedule: { every: global.days(1) },
  },

  {
    subredditName: "ArtBuddy",
    schedule: { every: global.days(1) },
  },

  {
    subredditName: "IDAP",
    schedule: { every: global.days(1) },
  },

  {
    subredditName: "Illustration",
    schedule: { every: global.days(1) },
  },

  {
    subredditName: "pics",
    post: { oc: true },
    schedule: { every: global.days(1) },
  },
];
