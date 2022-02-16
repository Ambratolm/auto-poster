///==============================================================================
// ■ Image (image.js)
//------------------------------------------------------------------------------
//     Image API Access Service for Retrieving Postable Images.
//==============================================================================
const { get } = require("axios");

//------------------------------------------------------------------------------
// ● Get-Random-Image
//------------------------------------------------------------------------------
exports.getRandomImage = async function({ blob = false } = {}) {
  try {
    const url = "https://random-artwork.herokuapp.com/dir/?json";
    const image = (await get(url)).data;
    if (blob) image.blob = (await get(image.url));
    return image;
  } catch(err) {
    throw Error(err.message);
  }
};