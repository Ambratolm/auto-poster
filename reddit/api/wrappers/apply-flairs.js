//------------------------------------------------------------------------------
// ● Apply-Flairs
//------------------------------------------------------------------------------
module.exports = async function applyFlairs(submission, flairsTexts = []) {
  try {
    const allFlairs = await submission.getLinkFlairTemplates();
    if (allFlairs && allFlairs.length) {
      const flairs = allFlairs.filter(function (flair) {
        for (const flairText of flairsTexts) {
          if (flairText.toLowerCase() === flair.flair_text.toLowerCase()) {
            return true;
          }
        }
        return false;
      });
      if (flairs && flairs.length) {
        for (const flair of flairs) {
          await submission.selectFlair({
            flair_template_id: flair.flair_template_id,
          });
        }
        console.success(
          "Reddit/API",
          `Flairs [${flairsTexts}] applied to submission ${submission.name}.`
        );
        return flairs;
      }
    }
  } catch (err) {
    console.warn(
      "Reddit/API",
      `Could not apply flairs [${flairsTexts}] to submission ${submission.name}.`
    );
  }
}