import { create } from 'zustand';

export const useDataStore = create((set, get) => ({
  cards: [],
  customers: [],
  transactions: [],
  programAvailable: true,
  isLoadingCards: true,
  isErrorCards: false,
  stamps: [],
  stampsRewards: [],
  giftRewards: [],

  deletedCards: [],

  setCustomers: (res) => {
    set((state) => ({ ...state.customers, customers: res }));
  },
  setTransactions: (res) => {
    set((state) => ({ ...state.transactions, transactions: res }));

    if (res?.length) {
      // Initialize an array to store rewards for stamps and giftcard
      const stampsRewards = [];
      const giftRewards = [];
      const stamps = [];

      // Regular expressions to match "stamps" and "giftcard" with optional suffix
      const stampsRegex = /^stamps/;
      const giftcardRegex = /^giftcard/;

      // Loop through each transaction
      res.forEach((transaction) => {
        // Check if the card type is "stamps"
        if (stampsRegex.test(transaction.passType)) {
          // Check if the max level is the same as the old level
          if (transaction.maxValue === transaction.oldValue) {
            // Find the index of the cardId in stampsRewards array
            const index = stampsRewards.findIndex((item) => item.cardId === transaction.cardId);

            if (index !== -1) {
              // Increment the rewards count for this cardId
              stampsRewards[index].total++;
            } else {
              // Initialize a new entry for this cardId
              stampsRewards.push({
                cardId: transaction.cardId,
                card: transaction.newPassJson,
                total: 1,
              });
            }
          }

          // Count Total of STAMPS
          if (
            transaction.newValue !== transaction.oldValue &&
            transaction.newValue > transaction.oldValue
          ) {
            const index = stamps.findIndex((item) => item.cardId === transaction.cardId);
            if (index !== -1) {
              // Increment the rewards count for this cardId
              const calculate = transaction.newValue - transaction.oldValue;
              // How do I incremeant this where I take the calculate value and add here here?
              stamps[index].total += calculate;
            } else {
              // Initialize a new entry for this cardId
              stamps.push({
                cardId: transaction.cardId,
                card: transaction.newPassJson,
                total: 1,
              });
            }
          }
        } else if (giftcardRegex.test(transaction.passType)) {
          // Check if the card type is "giftcard"
          const StartValue = transaction?.startValue;
          if (StartValue && transaction.oldValue === 0) {
            // Find the index of the cardId in giftRewards array
            const index = giftRewards.findIndex((item) => item.cardId === transaction.cardId);

            if (index !== -1) {
              // Increment the rewards count for this cardId
              giftRewards[index].total++;
            } else {
              // Initialize a new entry for this cardId
              giftRewards.push({
                cardId: transaction.cardId,
                card: transaction.newPassJson,
                total: 1,
              });
            }
          }
        }
      });

      // Set the stampsRewards and giftRewards arrays in your state or wherever you need them
      set({ stamps });
      set({ stampsRewards });
      set({ giftRewards });
    }
  },

  // ======= CARDS ======= //
  setIsLoadingCards: (res) => {
    set({ isLoadingCards: res });
  },
  setIsErrorCards: (res) => {
    set({ isErrorCards: res });
  },
  setCards: (res) => {

    const isAvailable = res?.length > 0 ? true : false;

    /** ==== ADD DELETED CARDS ID TO ARRAY (issue is no deleted field detected) */
    // if (isAvailable) {
    //   const deletedCards = res
    //     .filter((cards) => cards.deleted === true)
    //     .map((cards) => cards.cardId);

    //   // Set the deletedCards array
    //   console.log('DELETED CARDS', deletedCards)
    //   set({ deletedCards });
    // }
    /** ===== END ======== */
    
    set({ programAvailable: isAvailable });
    set((state) => ({ ...state.cards, cards: res }));
  },
}));
