import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cardInitialState_giftcard } from '../K/cards';
import { hexOrRgbToDarkest } from '../utils/hexOrRgbToDarkest';
import { hexOrRgbToLightest } from '../utils/hexOrRgbToLightest';
import { colorIsDark } from '../utils/colorIsDark';
import { formatColorCode } from '../utils/formatColorCode';
import { validateColorCode } from '../utils/validate';

export const useCardStore = create(
  persist(
    (set, get) => ({
      isLoading: null,
      isError: null,
      cardName: '',
      cardLogo: '',
      cardColor: '#e2e2e2',
      cardColorDark: '#2e2e2e',
      cardColorLight: '#ffffff',
      cardColorIsDark: false,
      cardProfileColor: '#e2e2e2',
      cardProfileColorDark: '#2e2e2e',
      cardProfileColorLight: '#ffffff',
      cardProfileColorIsDark: false,
      cardHex: '#e2e2e2',
      cardRGB: 'rgb(226,226,226)',
      cardState: cardInitialState_giftcard,
      introducing: false,
      messages: [],
      setMessages: (res) => {
        set({ messages: res });
      },
      askForPayment: false,
      setAskForPayment: (res) => {
        set({ askForPayment: res });
      },
      setIntroducing: (res) => {
        set({ introducing: res });
      },
      setCardState: (res) => {
        set({ cardState: res });
      },
      setCardName: (res) => {
        set({ cardName: res });
      },
      setCardColor: (res) => {
        const validateColor = validateColorCode(res);
        if (validateColor) {
          const formatedColor = formatColorCode(res);
          const darkColor = hexOrRgbToDarkest(formatedColor);
          const lightColor = hexOrRgbToLightest(formatedColor);
          const isDark = colorIsDark(formatedColor);
          set({ cardColor: formatedColor });
          set({ cardColorDark: darkColor });
          set({ cardColorLight: lightColor });
          set({ cardColorIsDark: isDark });
        }
      },
      setCardProfileColor: (res) => {
        const validateColor = validateColorCode(res);
        if (validateColor) {
          const formatedColor = formatColorCode(res);
          const darkColor = hexOrRgbToDarkest(formatedColor);
          const lightColor = hexOrRgbToLightest(formatedColor);
          const isDark = colorIsDark(formatedColor);
          set({ cardProfileColor: formatedColor });
          set({ cardProfileColorDark: darkColor });
          set({ cardProfileColorLight: lightColor });
          set({ cardProfileColorIsDark: isDark });
        }
      },
      setCardLogo: (res) => {
        set({ cardLogo: res });
      },
      setCardColorDark: (res) => {
        set({ cardColorDark: res });
      },
    }),
    {
      name: 'userCardStore',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
