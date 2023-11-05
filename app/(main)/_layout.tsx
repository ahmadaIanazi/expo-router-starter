/** ========= TABS NAVIGATION ========= */
import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function Tabs_Layout() {
  return (
    <Tabs screenOptions={{headerShown: false }}>
      <Tabs.Screen name='Home' />
      <Tabs.Screen name='List' />
      <Tabs.Screen name='post' options={{href: null}} />
    </Tabs>
  );
}

/** ========= TOPBAR NAVIGATION ========= */
/**
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<MaterialTopTabNavigationOptions, typeof Navigator>(
  Navigator
);

export default function Home_Layout() {
  return (
    <MaterialTopTabs title='what'>
      <MaterialTopTabs.Screen name='Home' />
    </MaterialTopTabs>
  )
}
 ========= END */

/** ========= DRAWER NAVIGATION ========= */
/**
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Drawer } from 'expo-router/drawer';

export default function Home_Layout() {
  return (
    <Drawer
    screenOptions={{
      drawerAllowFontScaling: true,
      drawerActiveBackgroundColor: '#000',
      drawerContentContainerStyle:{
        backdropFilter:'#555'
      }
    }}
    >
      <Drawer.Screen
        name='Home' // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name='List' // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'User',
          title: 'overview',
        }}
      />
    </Drawer>
  );
}
 ========= END */
