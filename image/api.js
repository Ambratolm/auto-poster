///==============================================================================
// ■ Image (image.js)
//------------------------------------------------------------------------------
//     Image API Access Service for Retrieving Postable Images.
//==============================================================================
const { get } = require("axios");

//------------------------------------------------------------------------------
// ● Endpoint
//------------------------------------------------------------------------------
const url = "https://random-artwork.herokuapp.com/dir/?json";

//------------------------------------------------------------------------------
// ● Get-Random-Image
//------------------------------------------------------------------------------
exports.getRandomImage = async function ({ blob = false } = {}) {
  try {
    const image = (await get(url)).data;
    if (blob) image.blob = await get(image.url);
    return image;
  } catch (err) {
    console.error("Image/API", "Could not get random image.");
    throw Error(err.message);
  }
};
