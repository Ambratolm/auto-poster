///==============================================================================
// ■ Image-API (image/api.js)
//------------------------------------------------------------------------------
//     Image API access service for retrieving postable images.
//==============================================================================
const { get } = require("axios");

///------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = { getRandomImage };

//------------------------------------------------------------------------------
// ● API-Endpoints
//------------------------------------------------------------------------------
const RANDOM_ARTWORK_URL = "https://random-artwork.herokuapp.com/dir/?json";

//------------------------------------------------------------------------------
// ● Get-Random-Image
//------------------------------------------------------------------------------
async function getRandomImage(options = {}) {
  try {
    const { blob } = options;
    const image = (await get(RANDOM_ARTWORK_URL)).data;
    if (blob) image.blob = await get(image.url);
    console.success("Image/API", `Random image ${image.name} retrieved.`);
    return image;
  } catch (err) {
    console.error(
      "Image/API",
      `Could not get random image from ${RANDOM_ARTWORK_URL}.`
    );
    throw Error(err.message);
  }
}
