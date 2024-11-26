import {StyleSheet, View, ScrollView} from 'react-native';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import {EventCarousel} from "@/components/EventCarousel";
import ClothingCard from "@/components/ClothingCard";
import FilterBar from "@/components/FilterBar";

const Home = () => {

    function cardPress() {
        console.log('cardPressed');
    }

  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
        <Text style={styles.text}>Your Events</Text>
        <EventCarousel />
        <Text style={styles.suggested}>Suggested</Text>
        <FilterBar />
        <View style={styles.recommendedScroll}>
            <ClothingCard image={require('../../assets/images/dressPNG.png')} bookmarked={false} buyType={"Buy"} cardPress={cardPress} priceAmount={20} size={"Small"}/>
            <ClothingCard image={require('../../assets/images/dressPNG.png')} bookmarked={false} buyType={"Buy"} cardPress={cardPress} priceAmount={20} size={"Small"}/>
            <ClothingCard image={require('../../assets/images/dressPNG.png')} bookmarked={false} buyType={"Buy"} cardPress={cardPress} priceAmount={20} size={"Small"}/>
            <ClothingCard image={require('../../assets/images/dressPNG.png')} bookmarked={false} buyType={"Buy"} cardPress={cardPress} priceAmount={20} size={"Small"}/>
            <ClothingCard image={require('../../assets/images/dressPNG.png')} bookmarked={false} buyType={"Buy"} cardPress={cardPress} priceAmount={20} size={"Small"}/>
            <ClothingCard image={require('../../assets/images/dressPNG.png')} bookmarked={false} buyType={"Buy"} cardPress={cardPress} priceAmount={20} size={"Small"}/>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        color: 'black',
        marginTop: 50,
        margin: 20,
        alignSelf: "center"
    },
    suggested: {
        fontSize: 40,
        color: 'black',
        margin: 16,
        alignSelf: "center"
    },
    recommendedScroll: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
    }
});
export default Home;