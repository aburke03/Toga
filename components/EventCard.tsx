import {Card, Text, CardProps} from 'react-native-ui-lib';
import {Component, useState} from "react";
import React from "react";
import {ImageBackground, StyleSheet} from "react-native";
import {gray} from "colorette";


export default function EventCard(props: any) {
    return (
            <Card height={350} width={350} borderRadius={10} flex center onPress={() => console.log('pressed')}>
                <ImageBackground source={props.image} resizeMode="cover" style={styles.image}>
                    <Card.Section style={styles.textbox} content={[
                        {text: props.name, style: styles.eventName},
                        {text: props.date, text70: true},
                        {text: props.host, text70: true}
                    ]}/>
                </ImageBackground>
            </Card>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        alignItems: 'center',
    },
    textbox: {
        position: 'absolute',
        bottom: 10,
        width: '80%',
        height: '30%',
        backgroundColor: 'rgba(217,217,217,.96)',
        justifyContent: 'center',
    },
    eventName: {
        fontSize: 40,
        color: 'black',
    }
});