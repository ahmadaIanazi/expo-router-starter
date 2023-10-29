import React, { ReactNode } from 'react';
import { firebase } from '../data/api/firebase';

interface FirebaseProviderProps {
  children: ReactNode;
}

export default function FirebaseProvider({ children }: FirebaseProviderProps): React.JSX.Element {

  firebase();
  return <>{children}</>;
}
