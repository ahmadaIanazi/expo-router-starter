// import axios from 'axios';
// import { addUpdate } from './addUpdate';
// import { getPassData } from './getPassData';
// import { replacePassJson } from '../replace';
// import { updatePassPassJson } from './updatePassPassJson';

// // Call the generatePass function
// export const updatePass = (cardId) => {
//   // Update Pass Value
//   const serialNumber = 'xNkM6FL1UacNEk8oFo8n';

//   getPassData(serialNumber).then((docData) => {
//     const passData = docData.passJson;
//     const pushToken = docData.pushToken;
//     const deviceLibraryIdentifier = docData.deviceLibraryIdentifier;
//     const updatePassData = replacePassJson(passData, action, value);

//     updatePassPassJson(serialNumber, updatePassData).then(() => {
//       axios
//         .post('https://us-central1-bettagah-570df.cloudfunctions.net/app/generate-updated-pass', {
//           serialNumber: serialNumber,
//         })
//         .then((resPassURL) => {
//           console.log('Pass Updated successfully:', resPassURL);
//           const passURL = resPassURL.data.data[0];
//           addUpdate(cardId, serialNumber, deviceLibraryIdentifier, passURL).then(() => {
//             axios
//               .post('https://us-central1-bettagah-570df.cloudfunctions.net/app/push-update', {
//                 deviceTokens: pushToken,
//               })
//               .then((response) => {
//                 console.log('Pass Updated successfully:', response.data);
//               })
//               .catch((error) => {
//                 console.error('Error Pass Update:', error);
//               });
//           });
//         })
//         .catch((error) => {
//           console.error('Error Pass Update:', error);
//         });
//     });
//   });
// };
