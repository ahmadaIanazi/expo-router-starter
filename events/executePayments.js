import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import React from 'react';

import Purchases from 'react-native-purchases';
import { addPayment } from '../data/add/addPayment';
import { updateDocField } from '../data/update/updateDocField';
import { useCardStore } from '../stores/useCardStore';
import { usePaywallStore } from '../stores/usePaywallStore';
import { useUserStore } from '../stores/useUserStore';

export default function executePayments() {
  const { cardState, setAskForPayment } = useCardStore();
  const { userDetails, customerInfo, offerings } = usePaywallStore();
  const { user } = useUserStore();
  const userId = user?.id || user?.uid;
  const cardId = cardState?.id;
  const navigation = useNavigation();

  const handlePurchaseProduct = async (pickedOffer) => {
    try {
      const purchaserInfo = await Purchases.purchasePackage(pickedOffer);

      addPayment(purchaserInfo, userId, cardId, pickedOffer, cardState);
      updateDocField('cards', cardId, 'paid', true);
      updateDocField('cards', cardId, 'trial', false);
      updateDocField('cards', cardId, 'pickedOffer', pickedOffer);

      navigation.goBack();
      setAskForPayment(false);
    } catch (error) {
      console.error('ERROR:', error);

      setAskForPayment(true);

      Alert.alert(
        'Purchase Failed',
        'There was an error during your purchase. Please try again, or contact support.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleRestorePurchase = async () => {
    try {
      await Purchases.restorePurchases();

      Alert.alert(
        'Restore Successful',
        'Your purchases have been restored successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
      setAskForPayment(false);
    } catch (error) {
      console.error('purchaserInfo', error);

      Alert.alert(
        'Restore Failed',
        'There was an error restoring your purchases. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
      setAskForPayment(true);
    }
  };

  // Execute a purchase offer
  const executePurchaseOffer = async (pickedOffer) => {
    try {
      const purchaserInfo = await Purchases.purchasePackage(pickedOffer);

      addPayment(purchaserInfo, userId, cardId, pickedOffer, cardState);
      return purchaserInfo;
    } catch (error) {
      throw error;
    }
  };

  // Display Packages
  const executeDisplayPackages = (offerings, offeringIdentifier) => {
    if (offerings && offerings.current !== null) {
      const currentOffering = offerings.all[offeringIdentifier];
      if (currentOffering && currentOffering.availablePackages.length !== 0) {
        // Display packages for sale
        // You can use currentOffering.availablePackages to show the available packages
      }
    }
  };

  // Execute a purchase Product
  const executePurchaseProduct = async (productId) => {
    try {
      await Purchases.purchaseProduct(productId);
    } catch (error) {
      throw error;
    }
  };

  const dontExecute = async (pickedPackage) => {
    try {
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(pickedPackage);
      if (typeof customerInfo.entitlements.active.my_entitlement_identifier !== 'undefined') {
        // Unlock content
      }
    } catch (e) {
      if (!e.userCancelled) {
        showError(e);
      }
    }

    const checkSubscriptionStatus = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        const activeSubscriptions = customerInfo.entitlements.active;
        const allPurchasedProducts = customerInfo.allPurchasedProductIdentifiers;
        const nonConsumablePurchases = customerInfo.nonConsumablePurchases;

        const myEntitlementIdentifier = '<your_entitlement_identifier>';
        const isUserSubscribed =
          typeof activeSubscriptions[myEntitlementIdentifier] !== 'undefined';

        return {
          isUserSubscribed,
          activeSubscriptions,
          allPurchasedProducts,
          nonConsumablePurchases,
        };
      } catch (error) {
        throw error;
      }
    };

    // -----
    // If you are NOT using Offerings/Packages:
    await Purchases.purchaseProduct('product_id');
  };

  const getAvailableOfferings = () => {
    const IDENTIFIER_STRING = 'offer-card-builder-';

    const data = offerings;
    const customerItems = customerInfo;

    const allItems = data?.all;
    /** FOR TESTING CHANGE TO activeItems = ['cardbuilderM2']  */
    // const activeItems = ['cardbuilderM2'];
    const activeItems = customerItems?.activeSubscriptions;

    let highestItemNumber = 1;

    const item = `${IDENTIFIER_STRING}${highestItemNumber}`;

    if (!allItems || !activeItems) {
      console.log('Necessary data is missing. Returning null.');
      return null;
    }

    if (!activeItems || activeItems.length === 0) {
      console.log('No active items. Returning all items.');
      return allItems[item];
    }

    activeItems.forEach((itemIdentifier) => {
      try {
        const lastDigit = parseInt(itemIdentifier.match(/\d$/)[0]);
        if (lastDigit > highestItemNumber) {
          highestItemNumber = lastDigit;
        }
      } catch (error) {
        console.error('Error processing item identifier:', error);
      }
    });

    const availableItemNumbers = allItems
      ? Object.keys(allItems)
          .filter((identifier) => identifier.startsWith(IDENTIFIER_STRING))
          .map((identifier) => parseInt(identifier.match(/\d+$/)[0]))
      : [];

    function findNextAvailableNumber(currentNumber, availableItemNumbers) {
      const sortedAvailableNumbers = availableItemNumbers
        .filter((num) => num > currentNumber)
        .sort((a, b) => a - b);
      return sortedAvailableNumbers[0];
    }

    let nextItemNumber = findNextAvailableNumber(highestItemNumber, availableItemNumbers);

    console.log('nextItemNumber', nextItemNumber);

    const maxItemNumber = Math.max(...availableItemNumbers);

    if (nextItemNumber <= maxItemNumber) {
      const nextItemIdentifier = `${IDENTIFIER_STRING}${nextItemNumber}`;
      const nextItem = allItems[nextItemIdentifier];

      console.log('nextItemIdentifier', nextItemIdentifier);

      if (nextItem) {
        return nextItem;
      }
    }

    return allItems[item];
  };

  return {
    executePurchaseOffer,
    handlePurchaseProduct,
    handleRestorePurchase,
    getAvailableOfferings,
  };
}

// import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';

// import { handlePurchaseProduct, handleRestorePurchase } from '../features/InAppPurchase';
// import Purchases from 'react-native-purchases';
// import { addPayment } from '../data/add/addPayment';
// import { useCardStore } from '../stores/useCardStore';
// import { useUserStore } from '../stores/useUserStore';
// import { usePaywallStore } from '../stores/usePaywallStore';
// import { updateDocField } from '../data/update/updateDocField';
// import { Alert } from 'react-native';

// export default function executePayments() {
//   const { cardState, setAskForPayment } = useCardStore();
//   const {
//     userDetails,
//     customerInfo,
//     currentOffering,
//     isSubscribed,
//     entitlements,
//     offerings,
//     activeSubscriptions,
//     allExpirationDates,
//     allPurchaseDates,
//     allPurchasedProductIdentifiers,
//     ActiveEntitlements,
//     AllEntitlements,
//     latestExpirationDate,
//     originalAppUserId,
//     nonSubscriptionTransactions,
//     originalApplicationVersion,
//     originalPurchaseDate,
//     requestDate,
//   } = usePaywallStore();
//   const { user } = useUserStore();
//   const userId = user?.id || user?.uid;
//   const cardId = cardState?.id;
//   const navigation = useNavigation();

//   const handlePurchaseProduct = (pickedOffer) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const purchaserInfo = await Purchases.purchasePackage(pickedOffer);
//         console.log('purchaserInfo', purchaserInfo);

//         addPayment(purchaserInfo, userId, cardId, pickedOffer, cardState);
//         updateDocField('cards', cardId, 'paid', true);
//         updateDocField('cards', cardId, 'trial', false);
//         updateDocField('cards', cardId, 'pickedOffer', pickedOffer);

//         navigation.goBack();
//         setAskForPayment(false);
//         resolve();
//       } catch (error) {
//         console.log('ERROR:', error);

//         setAskForPayment(true);

//         Alert.alert(
//           'Purchase Failed',
//           'There was an error during your purchase. Please try again, or contact support.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 navigation.goBack();
//                 reject();
//               },
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     });
//   };

//   const handleRestorePurchase = () => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const purchaserInfo = await Purchases.restorePurchases();
//         console.log('purchaserInfo', purchaserInfo);
//         // Show success alert
//         Alert.alert(
//           'Restore Successful',
//           'Your purchases have been restored successfully.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 resolve();
//                 navigation.goBack();
//               },
//             },
//           ],
//           { cancelable: false }
//         );
//         setAskForPayment(false);
//       } catch (error) {
//         console.log('purchaserInfo', error);
//         // Show error alert
//         Alert.alert(
//           'Restore Failed',
//           'There was an error restoring your purchases. Please try again.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 navigation.goBack();
//                 reject();
//               },
//             },
//           ],
//           { cancelable: false }
//         );
//         setAskForPayment(true);
//       }
//     });
//   };

//   // Execute a purchase offer
//   const executePurchaseOffer = async (pickedOffer) => {
//     try {
//       const purchaserInfo = await Purchases.purchasePackage(pickedOffer);
//       console.log('handlePurchaseProduct TRIGGERED!');
//       const log = purchaserInfo.customerInfo.entitlements.active;
//       console.log('handlePurchaseProduct ENTITLEMENT', log);
//       addPayment(purchaserInfo, userId, cardId, pickedOffer, cardState);
//       return purchaserInfo;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Display Packages
//   const executeDisplayPackages = (offerings, offeringIdentifier) => {
//     if (offerings && offerings.current !== null) {
//       const currentOffering = offerings.all[offeringIdentifier];
//       if (currentOffering && currentOffering.availablePackages.length !== 0) {
//         // Display packages for sale
//         // You can use currentOffering.availablePackages to show the available packages
//       }
//     }
//   };

//   // Execute a purchase Product
//   const executePurchaseProduct = async (productId) => {
//     try {
//       // You can optionally provide the product type as the third parameter. Defaults to PURCHASE_TYPE.SUBS
//       // The `null` second parameter is the `upgradeInfo` object discussed here: https://www.revenuecat.com/docs/managing-subscriptions#google-play
//       await Purchases.purchaseProduct(productId);
//     } catch (error) {
//       throw error;
//     }
//   };

//   const dontExecute = async (pickedPackage) => {
//     // Using Offerings/Packages
//     try {
//       const { customerInfo, productIdentifier } = await Purchases.purchasePackage(pickedPackage);
//       if (typeof customerInfo.entitlements.active.my_entitlement_identifier !== 'undefined') {
//         // Unlock that great "pro" content
//       }
//     } catch (e) {
//       if (!e.userCancelled) {
//         showError(e);
//       }
//     }

//     const checkSubscriptionStatus = async () => {
//       try {
//         const customerInfo = await Purchases.getCustomerInfo();
//         // Access the latest customerInfo to determine the subscription status
//         const activeSubscriptions = customerInfo.entitlements.active;
//         const allPurchasedProducts = customerInfo.allPurchasedProductIdentifiers;
//         const nonConsumablePurchases = customerInfo.nonConsumablePurchases;

//         // Determine the subscription status for your entitlement identifier
//         const myEntitlementIdentifier = '<your_entitlement_identifier>';
//         const isUserSubscribed =
//           typeof activeSubscriptions[myEntitlementIdentifier] !== 'undefined';

//         return {
//           isUserSubscribed,
//           activeSubscriptions,
//           allPurchasedProducts,
//           nonConsumablePurchases,
//         };
//       } catch (error) {
//         throw error;
//       }
//     };

//     // -----
//     // If you are NOT using Offerings/Packages:
//     await Purchases.purchaseProduct('product_id');

//     // Or, optionally provide the product type as the third parameter. Defaults to PURCHASE_TYPE.SUBS
//     // The `null` second parameter is the `upgradeInfo` object discussed here: https://www.revenuecat.com/docs/managing-subscriptions#google-play
//     await Purchases.purchaseProduct('product_id', null, Purchases.PURCHASE_TYPE.INAPP);
//   };

  // const getAvailableOfferings = () => {
  //   const IDENTIFIER_STRING = 'offer-card-builder-';

  //   const data = offerings;
  //   const customerItems = customerInfo;

  //   const allItems = data?.all;
  //   /** FOR TESTING CHANGE TO activeItems = ['cardbuilderM2']  */
  //   // const activeItems = ['cardbuilderM2'];
  //   const activeItems = customerItems?.activeSubscriptions;

  //   let highestItemNumber = 1;

  //   const item = `${IDENTIFIER_STRING}${highestItemNumber}`;

  //   if (!allItems || !activeItems) {
  //     console.log('Necessary data is missing. Returning null.');
  //     return null;
  //   }

  //   if (!activeItems || activeItems.length === 0) {
  //     console.log('No active items. Returning all items.');
  //     return allItems[item];
  //   }

  //   activeItems.forEach((itemIdentifier) => {
  //     try {
  //       const lastDigit = parseInt(itemIdentifier.match(/\d$/)[0]);
  //       if (lastDigit > highestItemNumber) {
  //         highestItemNumber = lastDigit;
  //       }
  //     } catch (error) {
  //       console.error('Error processing item identifier:', error);
  //     }
  //   });

  //   const availableItemNumbers = allItems
  //     ? Object.keys(allItems)
  //         .filter((identifier) => identifier.startsWith(IDENTIFIER_STRING))
  //         .map((identifier) => parseInt(identifier.match(/\d+$/)[0]))
  //     : [];

  //   function findNextAvailableNumber(currentNumber, availableItemNumbers) {
  //     const sortedAvailableNumbers = availableItemNumbers
  //       .filter((num) => num > currentNumber)
  //       .sort((a, b) => a - b);
  //     return sortedAvailableNumbers[0];
  //   }

  //   let nextItemNumber = findNextAvailableNumber(highestItemNumber, availableItemNumbers);

  //   console.log('nextItemNumber', nextItemNumber);

  //   const maxItemNumber = Math.max(...availableItemNumbers);

  //   if (nextItemNumber <= maxItemNumber) {
  //     const nextItemIdentifier = `${IDENTIFIER_STRING}${nextItemNumber}`;
  //     const nextItem = allItems[nextItemIdentifier];

  //     console.log('nextItemIdentifier', nextItemIdentifier);

  //     if (nextItem) {
  //       return nextItem;
  //     }
  //   }

  //   return allItems[item];
  // };

//   return {
//     executePurchaseOffer,
//     handlePurchaseProduct,
//     handleRestorePurchase,
//     getAvailableOfferings,
//   };
// }
