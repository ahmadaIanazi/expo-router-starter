import React, { ReactNode, Children, isValidElement, useEffect } from 'react';
import { useBottomStore } from './useBottomStore';

interface SheetProps {
  name: string;
  component: () => ReactNode;
}

export const Bottom: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setRouteComponents, setRoutesArray } = useBottomStore();

  useEffect(() => {
    let updatedRouteComponents: { [name: string]: () => ReactNode } = {}; // Provide type annotation
    let routeNames: ('none' | string)[] = ['none'];

    Children.toArray(children).forEach((child) => {
      if (React.isValidElement(child)) {
        const sheetProps = child.props as SheetProps;
        updatedRouteComponents[sheetProps.name] = sheetProps.component;
        routeNames.push(sheetProps.name);
      }
    });
    setRoutesArray(routeNames);
    setRouteComponents(updatedRouteComponents);

    console.log('TO UPDATE:', updatedRouteComponents);
    console.log('ROUTE NAMES:', routeNames);
  }, []);

  return null;
};

export const Sheet: React.FC<SheetProps> = () => {
  return null;
};

export default Bottom;
