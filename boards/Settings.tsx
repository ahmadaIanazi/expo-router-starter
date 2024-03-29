import executeAuth from '@/events/executeAuth';
import { useUserStore } from '@/stores/useUserStore';
import Background from '@/widgets/Background';
import Logo from '@/widgets/Logo';
import { View } from '@/xSetup/ui';
import React, { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { List, SegmentedButtons, useTheme } from 'react-native-paper';

export default function Settings() {
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const colors = useTheme()

  const [error, setError] = useState('');

  const { executeLogout } = executeAuth();

  const logout = async () => {
    try {
      await executeLogout();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View s='f js ac p-20' color={colors.colors.background}>
      <DarkMode />
      <Logo />
      <List.Section style={{ width: '80%' }}>
        <List.Subheader>Some title</List.Subheader>
        <List.Item
          title='First Item'
          description='Item description'
          left={(props) => <List.Icon {...props} icon='folder' />}
        />
        <List.Item title='Second Item' left={() => <List.Icon icon='folder' />} />
      </List.Section>
    </View>
  );
}

function DarkMode() {
  const { dark, setDark } = useUserStore();
  const getDeviceAppearance = useColorScheme(); // 'light' or 'dark'

  const userSettingsDark = dark != null ? (dark ? 'dark' : 'light') : 'light';
  const [value, setValue] = useState(dark != null ? userSettingsDark : getDeviceAppearance);
  const colors = useTheme();

  return (
    <SegmentedButtons
      value={value}
      onValueChange={(v)=> {
        const isDark = v === 'dark' ? true : false
        setDark(isDark)
        setValue(v)
       }}
      buttons={[
        {
          value: 'dark',
          label: '',
          icon: 'moon-waning-crescent',
        },
        { value: 'light', label: '', icon: 'white-balance-sunny' },
      ]}
    />
  );
}
