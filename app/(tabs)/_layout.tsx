import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Inventory from '@expo/vector-icons/MaterialIcons';
import Camera from '@expo/vector-icons/Entypo';
import BarCode from '@expo/vector-icons/AntDesign';
import Stats from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9835A0',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: 'black',
            borderTopWidth: 1,
            borderColor: '#1C1C1E',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'SCAN',
          tabBarIcon: ({ color }) => <Camera name="camera" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'CREATE',
          tabBarIcon: ({ color }) => <BarCode name="barcode" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'INVENTORY',
          tabBarIcon: ({ color }) => <Inventory name="inventory" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'STATISTICS',
          tabBarIcon: ({ color }) => <Stats name="linechart" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}