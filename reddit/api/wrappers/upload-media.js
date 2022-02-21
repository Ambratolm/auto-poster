//------------------------------------------------------------------------------
// ► Upload-Media
//------------------------------------------------------------------------------
// const { post } = require("axios");
// const FormData = require("form-data");
// async function _uploadMedia(requester, { name, type, blob }) {
//   const uploadResponse = await requester.oauthRequest({
//     uri: "api/media/asset.json",
//     method: "post",
//     form: {
//       filepath: name,
//       mimetype: type,
//     },
//   });
//   const uploadUrl = `https:${uploadResponse.args.action}`;
//   const formData = new FormData();
//   for (field of uploadResponse.args.fields) {
//     formData.append(field.name, field.value);
//   }
//   formData.append("file", blob, name);
//   const response = await post(uploadUrl, formData, { mode: "no-cors" });
//   return {
//     asset_id: uploadResponse.asset.asset_id,
//     link: `${uploadUrl}/${
//       uploadResponse.args.fields.find((field) => field.name === "key").value
//     }`,
//     websocket_url: uploadResponse.asset.websocket_url,
//   };
// }