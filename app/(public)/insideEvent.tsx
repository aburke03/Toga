import { StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import { router } from "expo-router";
import ClothingCard from "@/components/ClothingCard";

export default function InsideEvent() {
    const eventBackground = "https://t3.ftcdn.net/jpg/02/75/90/56/360_F_275905630_PzLJAFNCLUQYmzo8icryZdcwZ2LyCeJS.jpg";

    return (
        <View style={{ flex: 1 }}>


            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.backgroundContainer}>
                    <Image
                        source={{ uri: eventBackground }}
                        style={styles.image}
                    />
                    <TouchableWithoutFeedback onPress={() => router.back()}>
                        <Image
                            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/76dc4b34dc0f148da5ee5b240ca6b1b833f1819a8fa1b0875c62c63d82654ad2' }}
                            style={styles.backButton}
                            accessibilityLabel="Back button icon"
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.textbox}>
                        <Text style={styles.eventName}>Rodeo</Text>
                        <Text style={styles.eventName}>Host: Alpha Delta Pi</Text>
                        <Text style={styles.eventName} >Location: Alpha Delta Pi House</Text>
                        <View style={styles.date}>
                            <Text style={styles.dateText} >Nov. 30</Text>
                        </View>

                    </View>


                </View>


                <View style={styles.recommendedScroll}>

                    <ClothingCard
                        image={require('../../assets/images/dressPNG.png')}
                        bookmarked={false}
                        buyType={"Buy"}
                        priceAmount={20}
                        size={"Small"}
                    />
                    <ClothingCard
                        image={require('../../assets/images/dressPNG.png')}
                        bookmarked={false}
                        buyType={"Buy"}
                        priceAmount={20}
                        size={"Small"}
                    />
                    <ClothingCard
                        image={require('../../assets/images/dressPNG.png')}
                        bookmarked={false}
                        buyType={"Buy"}
                        priceAmount={20}
                        size={"Small"}
                    />
                    <ClothingCard
                        image={require('../../assets/images/dressPNG.png')}
                        bookmarked={false}
                        buyType={"Buy"}
                        priceAmount={20}
                        size={"Small"}
                    />
                    <ClothingCard
                        image={require('../../assets/images/dressPNG.png')}
                        bookmarked={false}
                        buyType={"Buy"}
                        priceAmount={20}
                        size={"Small"}
                    />
                    <ClothingCard
                        image={require('../../assets/images/dressPNG.png')}
                        bookmarked={false}
                        buyType={"Buy"}
                        priceAmount={20}
                        size={"Small"}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 15,
        width: 50,
        height: 50,
    },
    textbox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50%',
        backgroundColor: 'rgba(217,217,217,0.96)',

        paddingBottom: 10,


    },
    eventName: {
        top:'10%',
        marginLeft:'3%',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',

    },
    scrollContent: {
        padding: 0,
    },
    recommendedScroll: {
        marginTop:'10%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    date:{
        right: 0,
    },
    dateText:{
        right:'5%',
        bottom: '100%',
        fontSize: 30,
        alignSelf: 'flex-end',
    },
});
