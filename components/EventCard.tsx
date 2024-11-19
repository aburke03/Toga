import {Card} from 'react-native-ui-lib';
import React from "react";
import {ImageBackground, StyleSheet, View} from "react-native";


export default function EventCard(props: any) {
    return (
            <Card height={350} width={350} borderRadius={10} flex center onPress={() => console.log('pressed')}>
                <ImageBackground source={props.image} resizeMode="cover" style={styles.image}>
                    <View style={styles.infoBox}>
                        <Card.Section style={styles.textbox} content={[
                            {text: props.name, style: styles.eventName},
                            {text: "Host: " + props.host, text70: true},
                        ]}/>
                        <Card.Section style={styles.dateBox} content={[
                            {text: props.month, style: styles.month},
                            {text: props.days, style: styles.days},
                        ]}/>
                    </View>
                </ImageBackground>
            </Card>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        aspectRatio: 1,
        alignItems: 'center',
    },
    textbox: {
        alignSelf: "center",
        justifyContent: 'center',
    },
    eventName: {
        fontSize: 22,
        color: 'black',
    },
    infoBox: {
        position: 'absolute',
        bottom: 80,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10,
        width: '90%',
        height: '30%',
        backgroundColor: 'rgba(217,217,217,.96)',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateBox: {
        alignSelf: "center",
        justifyContent: 'center',
        borderRadius: 0,
        width: "20%",
    },
    month: {
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: "#92CAFF",
        width: "100%",
        borderRadius: 5
    },
    days: {
        textAlign: 'center',
        fontSize: 18,
    }
});