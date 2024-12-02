import { Slot, useRouter, useSegments } from 'expo-router';
import {useEffect, useState} from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import React from 'react';

const STRIPE_TEST_PUBLISHABLE_KEY="pk_test_51QN4V9I08saIli9VUFz6ouYM0znXpL6KIBOjFS605x6A9MDv9JTIOZj8pz0k99i1H9y4q71htEMGXJVnCPYFP46900NfwKVKRa";


const InitialLayout = () => {
  const router = useRouter();

  async function loadStorage() {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log('token', token);
      if (token !== null) {
        try {
          const response = await fetch("https://backend-toga-r5s3.onrender.com/api/users/profile", {
            method: "GET",
            headers: {
              'Authorization': "Bearer " + token,
            },
          })
          console.log(await response.json());

          if (!response.ok) {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user-id");
            router.replace('/login');
            console.error(`HTTP error! status: ${response.status}`);
          } else {
            router.replace('/home');
          }
        } catch (e) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user-id");
          console.log("Hello");
          console.error(e);
        }
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await loadStorage()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
      <StripeProvider 
      publishableKey={STRIPE_TEST_PUBLISHABLE_KEY}
      >
      <InitialLayout />
      </StripeProvider>
  );
};

export default RootLayout;