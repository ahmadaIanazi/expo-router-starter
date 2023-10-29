import { addTransaction } from '../../data/add/addTransaction';
import { updateCardPassJson } from '../../data/update/updateCardPassJson';
import { updateDocField } from '../../data/update/updateDocField';
import { updateDocsFieldByQuery } from '../../data/update/updateDocsFieldByQuery';
import { updatePassesJson } from '../../data/update/updatePassesJson';
import { uploadLogo } from '../../data/upload/uploadImage';
import { replacePassJson } from '../replace';
import { SendUpdatedPass } from '../SendUpdatedPass';

// Function to create a deep copy of an array or object
const deepCopy = (value) => {
  if (Array.isArray(value)) {
    return value.map(deepCopy); // Recursively copy each element
  } else if (typeof value === 'object' && value !== null) {
    const copy = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        copy[key] = deepCopy(value[key]); // Recursively copy each property
      }
    }
    return copy;
  } else {
    return value; // Return primitive values as is
  }
};


export const updatePass = (docData, type, headerValue, newLevel, newValue, oldValue, userId, closeModal) =>
  new Promise(async (resolve, reject) => {
    const completedMessage = {
      key: 'completedMessage',
      value: docData?.completedMessage,
    };
    const expiredMessage = {
      key: 'expiredMessage',
      value: docData?.expiredMessage,
    };
    const voidedMessage = {
      key: 'expiredMessage',
      value: docData?.voidedMessage,
    };

    const passData = docData.passJson;
    const cardId = docData.cardId;
    const updatedHeaderValue = [...headerValue, completedMessage]; 

    console.log('HEADER UPDATE:', updatedHeaderValue);
    const updatePassData = await replacePassJson(passData, type, updatedHeaderValue);

    closeModal();
    SendUpdatedPass(docData, updatePassData, newLevel, newValue)
      .then((res) => {
        addTransaction(docData, updatePassData, oldValue, newValue, newLevel)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            console.log('Catch Transactions', err);
            reject();
          });
      })
      .catch((err) => {
        console.log('Catch Send Updated Pass', err);
        reject();
      });
  });
   



export const updateCard = (cardData, type, value) =>
  new Promise(async (resolve, reject) => {
    const valueCopy = deepCopy(value); // Create a deep copy of the value array
    const valueCopy_2 = deepCopy(value); // Create another deep copy of the value array
    const valueCopy_3 = deepCopy(value); // Create another deep copy of the value array
    const cardId = cardData.id;
    const CardJson = cardData.passJson;

    const updatedCardJson = await replacePassJson(CardJson, type, valueCopy);

    updateCardPassJson(cardId, updatedCardJson)
      .then((doc) => {
        const cardData = doc // To be used later. This is useful for futher access.
        updatePassesJson(cardId, type, valueCopy_2).then(()=>{

          if(type == 'design'){
            const cardLogo = valueCopy_3.find((item) => item.key === 'logo')?.value;
            const cardUnit = valueCopy_3.find((item) => item.key === 'unit')?.value;
            const cardName = valueCopy_3.find((item) => item.key === 'name')?.value;
            const cardColor = valueCopy_3.find((item) => item.key === 'backgroundColor')?.value;

            if(cardLogo){
              uploadLogo(cardLogo, cardId).then(resolve).catch(reject);
            }
            updateDocField('cards', cardId, 'cardUnit', cardUnit);
            updateDocField('cards', cardId, 'cardName', cardName);
            updateDocField('cards', cardId, 'cardColor', cardColor);
            updateDocsFieldByQuery('passes', 'unit', cardUnit, 'cardId', '==', cardId)
              .then(resolve)
              .catch(reject);
          } 
          if (type == 'notificationSettings') {
            const completedMessage = valueCopy_3?.completed;
            const expiredMessage = valueCopy_3?.expired;
            const voidedMessage = valueCopy_3?.voided;
            updateDocField('cards', cardId, 'passCompletedMessage', completedMessage);
            updateDocField('cards', cardId, 'passExpiredMessage', completedMessage);
            updateDocField('cards', cardId, 'passVoidedMessage', completedMessage);
            updateDocsFieldByQuery('passes', 'completedMessage', completedMessage, 'cardId', '==', cardId)
            updateDocsFieldByQuery('passes', 'expiredMessage', expiredMessage, 'cardId', '==', cardId);
            updateDocsFieldByQuery('passes', 'voidedMessage', voidedMessage, 'cardId', '==', cardId)
            resolve();
          }
          resolve();
        }).catch(reject);

      })
      .catch(reject);
  });
