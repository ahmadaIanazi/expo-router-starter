import axios from 'axios';
import { API_URL } from '../../K/urls';
import { updateDocField } from '../../data/update/updateDocField';
import { serverTimestamp } from 'firebase/firestore';
import { addMessage } from '../../data/add/addMessage';

export const UpdateAllPasses = (cardId) =>
  new Promise((resolve, reject) => {

    updateDocField('cards', cardId, 'isUpdatingCards', true);
    if (cardId) {
      console.log('===== UPDATE ALL PASSES TRIGGERED.');
      console.log('===== cardId:', cardId);

      axios
        .post(API_URL + 'update-passes-design', {
          cardId: cardId,
        })
        .then((resPassURL) => {
          console.log('===== PUSH TO ALL PASSES SUCCESSEDED.');
          const sentTokens = resPassURL.data.sentTokens;
          const failedTokens = resPassURL.data.failedTokens;
          console.log('TOKENS:', { sentTokens, failedTokens });
          resolve({ sentTokens, failedTokens });
          const currentTime = serverTimestamp();
          updateDocField('cards', cardId, 'lastCardUpdate', currentTime);
          updateDocField('cards', cardId, 'isUpdatingCards', false);
        })
        .catch((err) => {
          console.log('===== PUSH TO ALL PASSES FAILED.');
          console.log('ERROR:', err);
          updateDocField('cards', cardId, 'isUpdatingCards', false);
          reject();
        });


    }
  });
