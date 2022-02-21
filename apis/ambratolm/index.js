///==============================================================================
// ■ Ambratolm (ambratolm/index.js)
//------------------------------------------------------------------------------
//     Ambratolm API access service.
//==============================================================================
const { get } = require("axios");

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { randomArtwork };

//------------------------------------------------------------------------------
// ● API-Endpoints
//------------------------------------------------------------------------------
const RANDOM_ARTWORK_URL = "https://random-artwork.herokuapp.com/dir/?json";

//------------------------------------------------------------------------------
// ● Random-Artwork
//------------------------------------------------------------------------------
async function randomArtwork(options = {}) {
  try {
    const { blob } = options;
    const image = (await get(RANDOM_ARTWORK_URL)).data;
    console.success("Image/API", `Random image ${image.name} retrieved.`);
    if (blob) {
      image.blob = await get(image.url);
      console.success("Image/API", `Blob for ${image.name} retrieved.`);
    }
    return image;
  } catch (err) {
    console.error(
      "Image/API",
      `Could not get random image from ${RANDOM_ARTWORK_URL}.`
    );
    throw Error(err.message);
  }
}
