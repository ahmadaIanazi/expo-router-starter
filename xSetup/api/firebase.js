import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_appId,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_measurementId,
};

export const fire = initializeApp(firebaseConfig);

export const auth = initializeAuth(fire, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export function firebase() {
  fire
    ? fire && console.log('#4 Firebase: Engine Started.')
    : console.log('#4 Firebase: Engine Not Working.');
}

export const db = getFirestore(fire);

export const storage = getStorage();

export const functions = getFunctions(fire);

/**

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_appId,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_measurementId,
  
  apiKey: 'AIzaSyD7ahq8Q3-p491LCaImwNW6IWv2co0gTMk',
  authDomain: 'bookit-7ba1f.firebaseapp.com',
  projectId: 'bookit-7ba1f',
  storageBucket: 'bookit-7ba1f.appspot.com',
  messagingSenderId: '630454194977',
  appId: '1:630454194977:web:0273f14e5c8f26b4ee6460',
  measurementId: 'G-WB21YP21WP',
};

*/
