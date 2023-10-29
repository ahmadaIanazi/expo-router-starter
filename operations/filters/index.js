export const filterCardsByUserId = (cards, userID) => {
  const filteredCards = cards.filter((card) => card.user_id === userID);
  return filteredCards;
};

export const filterPassesByMerchantId = (passes, merchantId) => {
  //NOTICE THE marchantId misspelling = merchant = marchant
  const filteredCards = passes.filter((pass) => pass.marchantId === merchantId);
  return filteredCards;
};

export const filterUnregisteredPasses = (passes) => {
  const filteredCards = passes.filter((pass) => pass.hasOwnProperty('passJson'));
  return filteredCards;
};