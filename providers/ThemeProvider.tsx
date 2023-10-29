import { useUserStore } from '@/stores/useUserStore';
import { en, ar } from '@/translations';
import { Theme } from '@/xSetup/setup_theme';
import Localization from '@context/locales';
import { getLocales } from 'expo-localization';
import React, { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  // User Settings
  const userSetToDark = useUserStore((state) => state.dark); // boolean true or false
  const userSetToArabic = useUserStore((state) => state.arabic); // boolean true or false

  // Device Settings
  const getDeviceAppearance = useColorScheme(); // 'light' or 'dark'
  const getDeviceLocale = getLocales()[0].languageCode; // 'en' or 'ar' .. etc

  // Logic to set Device Setting or User Settings.
  const selectedTheme =
    userSetToDark !== null ? userSetToDark : getDeviceAppearance === 'dark' ? true : false;
  const selectedLocalization =
    userSetToArabic !== null ? userSetToArabic : getDeviceLocale === 'ar' ? true : false;

  // Set the values
  const setTheme = selectedTheme
    ? { ...MD3DarkTheme, colors: Theme.colors.dark }
    : { ...MD3LightTheme, colors: Theme.colors.light };
  const setLocal = selectedLocalization ? ar : en;

  return (
    <PaperProvider theme={setTheme}>
      <Localization.Provider value={setLocal}>
        <>{children}</>
      </Localization.Provider>
    </PaperProvider>
  );
}
