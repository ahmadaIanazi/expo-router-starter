import axios from 'axios';
import { API_URL } from '../../K/urls';
import { updateDocField } from '../../data/update/updateDocField';
import { serverTimestamp } from 'firebase/firestore';
import { addMessage } from '../../data/add/addMessage';

export const SendMessageToAllCards = (cardIds, pushNotificationValue, customersCount) =>
  new Promise((resolve, reject) => {
    const results = []; // Array to store results for each card

    const processCard = (cardId) => {
      addMessage(cardId, pushNotificationValue, customersCount);
      updateDocField('cards', cardId, 'isSendingPushNotification', true);
      console.log('===== PUSH TO ALL PASSES TRIGGERED.');
      console.log('===== cardId:', cardId);
      console.log('===== pushNotificationValue:', pushNotificationValue);
      if (cardId && pushNotificationValue) {
        console.log('===== CARD ID VALID: PUSH TO ALL PASSES TRIGGERED.');
        axios
          .post(API_URL + 'generate-updated-passes', {
            cardId: cardId,
            pushNotification: pushNotificationValue,
          })
          .then((resPassURL) => {
            const sentTokens = resPassURL.data.sentTokens;
            const failedTokens = resPassURL.data.failedTokens;
            console.log('TOKENS:', { sentTokens, failedTokens });
            results.push({ cardId, sentTokens, failedTokens });
            const currentTime = serverTimestamp();
            updateDocField('cards', cardId, 'lastPushNotification', currentTime);
            updateDocField('cards', cardId, 'isSendingPushNotification', false);
            if (results?.length === cardIds?.length) {
              resolve(results); // Resolve with all results when all cards have been processed
            }
          })
          .catch((err) => {
            console.log('ERROR:', err);
            updateDocField('cards', cardId, 'isSendingPushNotification', false);
            results.push({ cardId, sentTokens: [], failedTokens: [] }); // Record failure for the current card
            if (results?.length === cardIds?.length) {
              resolve(results); // Resolve with all results when all cards have been processed
            }
          });
      }
    };

    for (const cardId of cardIds) {
      processCard(cardId);
    }
  });
