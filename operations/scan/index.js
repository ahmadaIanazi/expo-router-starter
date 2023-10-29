import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../data/api/firebase';
import { filterUnregisteredPasses } from '../filters';
import { filterPassesByMerchantId } from '../filters';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

function extractCountryCode(phoneNumber) {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const parsedNumber = phoneUtil.parse(phoneNumber);
  const countryCode = parsedNumber.getCountryCode();

  return '+' + countryCode;
}  

function extractPhoneNumber(phoneNumber) {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const parsedNumber = phoneUtil.parse(phoneNumber);
  const formattedNumber = phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);

  // Remove the '+' sign and the country code from the formatted number
  const phoneNumberWithoutCountryCode = formattedNumber.slice(
    parsedNumber.getCountryCode().toString()?.length + 1
  );

  return phoneNumberWithoutCountryCode;
}

export const getScannedBarCode = (serialNumber, merchantId) =>
  new Promise(async (resolve, reject) => {
    try {
      // Fetch the document with the given serialNumber from the Firestore collection
      console.log('TRIGGERED getScannedBarCode');
      const docRef = doc(db, 'passes', serialNumber);
      const docSnap = await getDoc(docRef);

      // Check if the document exists
      if (docSnap.exists()) {
        console.log('DOC EXIST');
        // Get the deviceLibraryIdentifier field value from the document
        const deviceLibraryIdentifier = docSnap.data().deviceLibraryIdentifier;

        // Query all passes documents that match the deviceLibraryIdentifier
        // from the passes collection and return the result
        // Replace the code below with your actual query implementation
        const passes = await queryPassesByDeviceID(deviceLibraryIdentifier);
        const filteredPasses = filterPassesByMerchantId(passes, merchantId);
        resolve(filteredPasses);
      } else {
        console.log('DOC DOESNT EXIST');
        // Document with the given serialNumber does not exist
        // resolve([]);
        reject();
      }
    } catch (error) {
      reject(error);
    }
  });

export const queryPassesByDeviceID = async (deviceLibraryIdentifier) => {
  try {
    // Create a query to retrieve documents where deviceLibraryIdentifier matches the provided value
    console.log('TRIGGERED query');

    const passesRef = collection(db, 'passes');
    const q = query(passesRef, where('deviceLibraryIdentifier', '==', deviceLibraryIdentifier));

    // Execute the query and retrieve the documents
    const querySnapshot = await getDocs(q);

    // Extract the data from the documents and return the result as an array
    const passes = querySnapshot.docs.map((doc) => doc.data());
    console.log('QUERY PASS:', passes);
    return passes;
  } catch (error) {
    // Handle any errors that occur during the query
    console.log('ERROR: ');
    throw new Error('Failed to query passes by deviceLibraryIdentifier: ' + error.message);
  }
};

export const getScannedPhone = (phone, merchantId) =>
  new Promise(async (resolve, reject) => {
    try {
      const passes = await queryPassesByPhoneNumber(phone);
      const filterByMerchantId = filterPassesByMerchantId(passes, merchantId);
      const filterUnregistered = filterUnregisteredPasses(filterByMerchantId);
      resolve(filterUnregistered);
    } catch (error) {
      console.log('ERROR IN THE FIRST TRIGGER');
      reject();
    }
  });

const queryPassesByPhoneNumber = async (phone) => {
  try {
    const countryCode = extractCountryCode(phone);
    const phoneOnly = extractPhoneNumber(phone);
    const passesRef = collection(db, 'passes');
    const q = query(
      passesRef,
      where('phone', '==', phoneOnly),
      where('countryCode', '==', countryCode)
    );

    // Execute the query and retrieve the documents
    const querySnapshot = await getDocs(q);

    // Extract the data from the documents and return the result as an array
    const passes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return passes;
  } catch (error) {
    // Handle any errors that occur during the query
    console.log('ERROR:', error);
    throw new Error('Failed to query passes by deviceLibraryIdentifier: ' + error.message);
  }
};
