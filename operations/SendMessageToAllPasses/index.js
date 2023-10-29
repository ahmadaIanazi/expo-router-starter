import axios from 'axios';
import { API_URL } from '../../K/urls';
import { updateDocField } from '../../data/update/updateDocField';
import { serverTimestamp } from 'firebase/firestore';
import { addMessage } from '../../data/add/addMessage';

export const SendMessageToAllPasses = (cardId, pushNotificationValue) =>
  new Promise((resolve, reject) => {
    addMessage(cardId, pushNotificationValue);
    updateDocField('cards', cardId, 'isSendingPushNotification', true);
    if (cardId && pushNotificationValue) {
      console.log('===== PUSH TO ALL PASSES TRIGGERED.');
      console.log('===== cardId:', cardId);
      console.log('===== pushNotificationValue:', pushNotificationValue);
      axios
        .post(API_URL + 'generate-updated-passes', {
          cardId: cardId,
          pushNotification: pushNotificationValue,
        })
        .then((resPassURL) => {
          console.log('===== PUSH TO ALL PASSES SUCCESSEDED.');
          const sentTokens = resPassURL.data.sentTokens;
          const failedTokens = resPassURL.data.failedTokens;
          console.log('TOKENS:', { sentTokens, failedTokens });
          resolve({ sentTokens, failedTokens });
          const currentTime = serverTimestamp();
          updateDocField('cards', cardId, 'lastPushNotification', currentTime);
          updateDocField('cards', cardId, 'isSendingPushNotification', false);
        })
        .catch((err) => {
          console.log('===== PUSH TO ALL PASSES FAILED.');
          console.log('ERROR:', err);
          updateDocField('cards', cardId, 'isSendingPushNotification', false);
          reject();
        });
    }
  });
