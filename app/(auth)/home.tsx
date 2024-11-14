import {StyleSheet, View} from 'react-native';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import {EventCarousel} from "@/components/EventCarousel";

const Home = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
        <Text style={styles.text}>Your Events</Text>
        <EventCarousel />
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        color: 'black',
        marginTop: 50,
        margin: 20
    },
});
export default Home;