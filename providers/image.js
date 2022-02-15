///==============================================================================
// ■ Image (image.js)
//------------------------------------------------------------------------------
//     Image provider.
//==============================================================================
const { get } = require("axios");

//------------------------------------------------------------------------------
// ● Get-Random-Image
//------------------------------------------------------------------------------
exports.getRandomImage = async function() {
  try {
    const url = "https://random-artwork.herokuapp.com/dir/?json";
    const response = await get(url);
    return response.data;
  } catch(err) {
    throw Error(err.message);
  }
};
