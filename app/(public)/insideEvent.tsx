import { StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import { router } from "expo-router";
import ClothingCard from "@/components/ClothingCard";
import { AntDesign } from '@expo/vector-icons';
import FilterBar from "@/components/FilterBar";



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
                </View>

                    <View style={styles.textbox}>
                        <Text style={styles.eventName}>Rodeo</Text>
                        <Text style={styles.eventName}>Host: Phi Mu</Text>
                        <Text style={styles.eventName} >Location: Phi Mu House</Text>

                        <View style={styles.date}>
                            <Text style={styles.dateText} >Nov. 30</Text>
                        </View>

                    </View>

                <TouchableWithoutFeedback onPress={() => router.back()}>
                    <View style={styles.addToEvent}>
                    <Text style={styles.addToEventText}>Add Listing</Text>
                    </View>
                </TouchableWithoutFeedback>

                <FilterBar></FilterBar>




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
        height: '80%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: '5%',
        left: '3%',
        width: 50,
        height: 50,
    },
    textbox: {
        position: 'fixed',
        bottom: '4.3%',
        left: 0,
        width: '100%',
        height: '12%',
        backgroundColor: 'transparent',
        opacity: 100,

    },
    eventName: {
        top:'10%',
        marginLeft:'3%',
        fontSize: 20,
        paddingBottom: '2%',
        color: 'black',
        fontWeight: 'bold',

    },
    scrollContent: {
        padding: 0,
    },
    recommendedScroll: {
        marginTop:'5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    date: {
        top: '-76%',
        alignSelf: 'flex-start',
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 20,
        marginTop: 10,
    },
    dateText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addToEvent: {
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderRadius: 5,
        justifyContent: "center",
        height: '5%',
        width: '80%',
        top:'-4%',

    },
    addToEventText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,

    }


});
