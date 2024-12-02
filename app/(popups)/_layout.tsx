import React from 'react';
import { Stack } from 'expo-router';

export default function PopupsLayout() {
    return (
        <Stack 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#461D7C',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                presentation: 'modal',
            }}
        />
    );
}