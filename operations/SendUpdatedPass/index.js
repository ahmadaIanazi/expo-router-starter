import axios from 'axios';
import { addUpdate } from '../../data/add/addUpdate';
import { updatePassPassJson } from '../../data/update/updatePassPassJson';
import { API_URL } from '../../K/urls';

export const SendUpdatedPass = (docData, updatedPassJSON, passLevel, newValue) =>
  new Promise((resolve, reject) => {
    const cardId = docData.cardId;
    const serialNumber = docData.serialNumber;
    const passDocId = docData.id
    const level = passLevel;

    const pushToken = docData.pushToken;
    const deviceLibraryIdentifier = docData.deviceLibraryIdentifier;

    console.log('SendUpdatedPass:', deviceLibraryIdentifier, pushToken);

    updatePassPassJson(passDocId, updatedPassJSON, passLevel, newValue)
      .then(() => {
        axios
          .post(API_URL + 'generate-updated-pass', {
            serialNumber: passDocId,
            level: level,
          })
          .then((resPassURL) => {
            const passURL = resPassURL.data.data[0];

            addUpdate(cardId, serialNumber, deviceLibraryIdentifier, passURL, passLevel, newValue)
              .then(() => {
                axios
                  .post(API_URL + 'push-update', {
                    deviceTokens: pushToken,
                  })
                  .then((response) => {
                    resolve(response.data);
                  })
                  .catch((err) => {
                    console.log('CATCH PUTCH UPDATE', err);
                    reject();
                  });
              })
              .catch((err) => {
                console.log('CATCH ADD UPDATE', err);
                reject;
              });
          })
          .catch((err) => {
            console.log('CATCH AXIOS', err);
            reject();
          });
      })
      .catch((err) => {
        console.log('CATCH Update PassJson', err);
        reject();
      });
  });
