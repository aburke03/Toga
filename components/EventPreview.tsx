import React from "react";
import {Card, Text, CardProps, Image, View} from 'react-native-ui-lib';
import {Component, useState} from "react";
import {ImageBackground, StyleSheet} from "react-native";

export default function EventPreview(props: any) {

    const eventBackground = "https://t3.ftcdn.net/jpg/02/75/90/56/360_F_275905630_PzLJAFNCLUQYmzo8icryZdcwZ2LyCeJS.jpg";
    const featuredClothes = [
        "https://pngimg.com/d/dress_PNG156.png",
        "https://e7.pngegg.com/pngimages/925/483/png-clipart-little-black-dress-transparency-clothing-chinese-military-uniform-fashion-party-dress.png",
        "https://image.similarpng.com/very-thumbnail/2021/07/Easy-summer-women's-clothing--on-transparent-background-PNG.png",
    ];

    return (
        <View style={styles.screenContainer}>
        <Card onPress={() => console.log('pressed')}>
        <View style={styles.card}>

            <View style={styles.backgroundContainer}>
                <Image source={{ uri: eventBackground }} style={styles.image} />
                <View style={styles.textbox}>
                    <Text style={styles.eventName}>Your Text Here</Text>
                </View>
            </View>

            <View style={styles.featuredContainer}>
                {featuredClothes.map((src, index) => (
                    <View key={index} style={styles.featuredWrapper}>
                        <Image source={{ uri: src }} style={styles.clothes} />
                    </View>
                ))}
            </View>
        </View>
        </Card>
        </View>
    );
};

const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: 300,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 10,
        position: 'relative',

    },
    backgroundContainer: {
        position: 'relative',

    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    textbox: {
        position: 'absolute',
        bottom: 10,
        left: '10%',
        width: '80%',
        height: '50%',
        backgroundColor: 'rgba(217,217,217,0.96)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    eventName: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
    featuredContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    featuredWrapper: {
        width: '30%',
    },
    clothes: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 5,
    },
});