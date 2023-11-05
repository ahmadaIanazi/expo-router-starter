import { Appbar as PaperAppbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

interface Action {
  icon: string;
  onPress: () => void;
}

interface AppbarProps {
  title?: string;
  showBackAction?: boolean;
  onBackActionPress?: () => void;
  actions?: Action[];
}

export default function Appbar({
  title = 'Title',
  showBackAction = false,
  onBackActionPress = () => {},
  actions = [],
}: AppbarProps) {
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  return (
    <PaperAppbar.Header style={{ paddingTop: insets.top }}>
      {showBackAction && <PaperAppbar.BackAction onPress={onBackActionPress} />}
      <PaperAppbar.Content title={title} />
      {actions.map((action, index) => (
        <PaperAppbar.Action key={index} icon={action.icon} onPress={action.onPress} />
      ))}
    </PaperAppbar.Header>
  );
}
