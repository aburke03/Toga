import { Slot, useRouter, useSegments } from 'expo-router';
import {useEffect, useState} from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STRIPE_PUBLISHABLE_KEY="pk_live_51QN4V9I08saIli9Vj8v5zY2eMzsw3bAgWJr4G7cUGnIRKjQVsgOqRTVKK3iXAxM9V2uV1PjMjI7RtuUd1k0UlzaB00Ol4RIdXP";


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
            router.replace('/login');
            console.error(`HTTP error! status: ${response.status}`);
          } else {
            router.replace('/home');
          }
        } catch (e) {
          await AsyncStorage.removeItem("token");
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

const RootLayout = () => {
  return (
      <StripeProvider 
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      >
        <InitialLayout />
      </StripeProvider>
  );
};

export default RootLayout;