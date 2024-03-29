import { auth } from '../api/firebase';

import { signOut } from 'firebase/auth';

export const signout = () =>
  new Promise((resolve, reject) => {
    signOut(auth)
      .then(resolve)
      .catch((err) => reject(err));
  });
