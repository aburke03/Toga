import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { StripeProvider } from '@stripe/stripe-react-native';

const CLERK_PUBLISHABLE_KEY = 'pk_test_dXNlZnVsLWdsb3d3b3JtLTc1LmNsZXJrLmFjY291bnRzLmRldiQ';
const STRIPE_PUBLISHABLE_KEY="pk_live_51QN4V9I08saIli9Vj8v5zY2eMzsw3bAgWJr4G7cUGnIRKjQVsgOqRTVKK3iXAxM9V2uV1PjMjI7RtuUd1k0UlzaB00Ol4RIdXP";


const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn]);

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
    <ClerkProvider 
    publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <StripeProvider 
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      >
      <InitialLayout />
      </StripeProvider>
    </ClerkProvider>
  );
};

export default RootLayout;