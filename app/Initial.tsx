import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { Slot, Stack, router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import Setup from './setup';

const DEVELOPMENT_ROUTE_OVERRIDE = '/(onboard)/Onboard'

export default function Initial(): React.JSX.Element {
  const { loadingUser, loadingUserData, authCheck, refresh } = useAuthStore();
  const { seenOnboard } = useNavigationStore();

  const segment = useSegments();

  const isSignedIn = authCheck === true;
  const isLoaded = loadingUser === false && loadingUserData === false;

  useEffect(() => {
    console.log('#7 ROOT INITIAL START');
    if (!isLoaded) return;

    const isRoutesGroups = segment[0] === '(main)';

    if (isSignedIn && !isRoutesGroups) {
      router.replace('/(main)/Home');
    } else if (!isSignedIn) {
      console.log('SEEN ONBAORD?', seenOnboard)
      const navigateTo = seenOnboard ? '/(auth)/Welcome' : '/(onboard)/Onboarding';
      router.replace(navigateTo);
    }
  }, [isSignedIn, isLoaded]);

  return <Setup/>
}
