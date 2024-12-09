import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TabsPage = () => {

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#92CAFF',
        },
        headerTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="home"
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            tabBarLabel: 'Home',
        }}
      />
        <Tabs.Screen
            name="events"
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
                tabBarLabel: 'Events',
            }}
        />
        <Tabs.Screen
            name="chat"
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />,
                tabBarLabel: 'Chats',
            }}
        />
      <Tabs.Screen
        name="profile"
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
            tabBarLabel: 'Profile',
        }}
        />
    </Tabs>
  );
};

export default TabsPage;