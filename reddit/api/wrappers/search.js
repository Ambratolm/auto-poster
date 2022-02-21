//------------------------------------------------------------------------------
// ► Search
//------------------------------------------------------------------------------
module.exports = async function search(subreddit, options = {}) {
  try {
    const { query = "", sort = "new", limit = 5 } = options;
    const submissions = await subreddit.search({ query, sort, limit });
    console.log(
      "Reddit/API",
      `Found ${submissions.length} ${sort} submissions in r/${subreddit.display_name} matching ${query}.`
    );
    return submissions;
  } catch (err) {
    console.warn(
      "Reddit/API",
      `Could not search for ${query} in r/${subreddit.display_name}.`
    );
  }
}