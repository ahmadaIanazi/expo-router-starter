import React, { ReactNode } from 'react';
import Bottoms from './config';

interface ModalProviderProps {
  children: ReactNode;
}

export default function BottomsProvider({ children }: ModalProviderProps): React.JSX.Element {
  return (
    <>
      {children}
      <Bottoms />
    </>
  );
}
