import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

interface MainProps {
  children?: ReactNode;
  center?: 'center' | 'top' | 'left' | 'right' | 'bottom';
  padding?: number;
  safe?: 'none' | 'all' | 'top' | 'bottom' | 'left' | 'right';
  color?: string
}

export default function Main({
  children,
  center = 'center',
  padding = 0,
  safe = 'none',
  color
}: MainProps): React.JSX.Element {
  const colors = useTheme();
  const { top, bottom, left, right } = useSafeAreaInsets();
  const background = color ? color : colors.colors.background

  const mainStyles: StyleProp<ViewStyle> = {
    flex: 1,
    width:'100%',
    padding,
    alignSelf: 'center',
    backgroundColor: background,
  };

  if (safe === 'all') {
    mainStyles.paddingTop = top + padding;
    mainStyles.paddingBottom = bottom + padding;
    mainStyles.paddingLeft = left + padding;
    mainStyles.paddingRight = right + padding;
  } else if (safe === 'top') {
    mainStyles.paddingTop = top;
  } else if (safe === 'bottom') {
    mainStyles.paddingBottom = bottom;
  } else if (safe === 'left') {
    mainStyles.paddingLeft = left;
  } else if (safe === 'right') {
    mainStyles.paddingRight = right;
  }

  if (center === 'center') {
    mainStyles.justifyContent = 'center';
    mainStyles.alignItems = 'center';
  } else if (center === 'top') {
    mainStyles.justifyContent = 'flex-start';
    mainStyles.alignItems = 'center';
  } else if (center === 'left') {
    mainStyles.justifyContent = 'flex-start';
    mainStyles.alignItems = 'flex-start';
  } else if (center === 'right') {
    mainStyles.justifyContent = 'flex-end';
    mainStyles.alignItems = 'flex-end';
  } else if (center === 'bottom') {
    mainStyles.justifyContent = 'flex-end';
    mainStyles.alignItems = 'center';
  }

  return <View style={mainStyles}>{children}</View>;
}
