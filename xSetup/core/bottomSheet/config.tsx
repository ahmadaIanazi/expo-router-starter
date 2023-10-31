import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { useUserStore } from '@/stores/useUserStore';
import { useBottomStore } from './useBottomStore';
import Layout, { Types as TypesFromLayout } from '@/app/(bottom)';

type Types = (typeof TypesFromLayout)[number];

const snapPoints: string[] = ['80%'];

export default function BottomSheetConfig() {
  const colors = useTheme();
  const { routeComponents, defaultState, bottomState, setBottom } = useBottomStore();

  const [modalHeaderColor, setModalHeaderColor] = useState(colors.colors.background);
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const dark = useUserStore((state) => state.dark);

  useEffect(() => {
    if (bottomState?.open && bottomSheetRef?.current) {
      bottomSheetRef?.current?.expand();
    }
  }, [bottomState]);

  useEffect(() => {
    setModalHeaderColor(colors.colors.background);
  }, [dark]);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setBottom(defaultState);
    }
  }, []);

  const closeModal = () => {
    console.log('I AM THE ISSUE ==> closeModal');
    bottomSheetRef?.current?.close();
    setBottom(defaultState);
  };

  const onClose = () => {
    console.log('I AM THE ISSUE ==> onClose');
    bottomSheetRef?.current?.close();
    setBottom(defaultState);
  };

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        opacity={1.9}
        disappearsOnIndex={-1}
        // pressBehavior='none'
        onPress={closeModal}
        appearsOnIndex={1}
      />
    ),
    []
  );

  // const Component = routeComponents['One'];

  const renderContent = (route: 'none' | Types ) => {
    const Component = routeComponents[route]

    let renderedComponent;

    if (typeof Component === 'function') {
      renderedComponent = <Component />; // Render the JSX component
    } else {
      renderedComponent = Component;
    }

    return (
      <>
        <Layout />
        {renderedComponent || <></>}
      </>
    );
  };


  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      // onClose={() => onClose()} // !! DONT USE THIS IT KEEPS TRIGGERING.
      overDragResistanceFactor={10}
      enableOverDrag={false}
      handleStyle={{
        height: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: modalHeaderColor,
      }}
      onChange={handleSheetChanges}
      backdropComponent={bottomState?.open ? renderBackdrop : null}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: modalHeaderColor,
        borderRadius: 20,
      }}
    >
      {renderContent(bottomState.route)}
    </BottomSheet>
  );
}
