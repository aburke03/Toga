import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

export default function PopupsLayout() {
    const [fontsLoaded] = useFonts({
        Bella: require('../../assets/fonts/bellaboo-1.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#92CAFF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: "white",
                    fontFamily: 'Bella',
                },
                presentation: 'modal',
            }}
        />
    );
}
