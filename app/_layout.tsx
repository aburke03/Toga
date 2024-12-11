import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

// Stripe key rolled, generate new key from stripe dashboard in the future for intended functionality
const STRIPE_TEST_PUBLISHABLE_KEY = "pk_test_51QN4V9I08saIli9VUFz6ouYM0znXpL6KIBOjFS605x6A9MDv9JTIOZj8pz0k99i1H9y4q71htEMGXJVnCPYFP46900NfwKVKRa";

const InitialLayout = () => {
  const router = useRouter();

  async function loadStorage() {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log('Token:', token);

      if (token) {
        const response = await fetch("https://backend-toga-r5s3.onrender.com/api/users/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          router.replace('/home');
        } else {
          console.error('Invalid token, redirecting to login');
          await AsyncStorage.clear();
          router.replace('/login');
        }
      } else {
        console.log('No token found, redirecting to Welcome');
        router.replace('/welcome');
      }
    } catch (error) {
      console.error('Error in loadStorage:', error);
      router.replace('/welcome');
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <StripeProvider publishableKey={STRIPE_TEST_PUBLISHABLE_KEY}>
      <InitialLayout />
    </StripeProvider>
  );
};

export default RootLayout;
