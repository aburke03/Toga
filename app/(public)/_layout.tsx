import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#92CAFF',
                },
                headerTintColor: '#fff',
                headerBackTitle: 'Back',
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    headerTitle: 'Toga',
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    headerTitle: 'Create Account',
                }}
            />
            <Stack.Screen
                name="reset"
                options={{
                    headerTitle: 'Reset Password',
                }}
            />
        </Stack>
    );
};

export default PublicLayout;
