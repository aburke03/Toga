import {StyleSheet, View} from 'react-native';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import {EventCarousel} from "@/components/EventCarousel";
import EventCard from "@/components/EventCard";

const Home = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
        <Text style={styles.text}>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
        <Text style={styles.text}>Your Events 🎉</Text>
        <EventCarousel />
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
      fontSize: 40,
      color: 'black',
    },
});
export default Home;