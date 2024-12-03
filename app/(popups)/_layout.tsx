import React from 'react';
import { Stack } from 'expo-router';

export default function PopupsLayout() {
    return (
        <Stack 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#92CAFF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: "black"
                },
                presentation: 'modal',
            }}
        />
    );
}