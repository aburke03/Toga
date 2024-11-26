import {Card} from 'react-native-ui-lib';
import React, {useState} from "react";
import {ImageBackground, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function ClothingCard(props: any) {

    const [bookmarked, setBookmarked] = useState(props.bookmarked);

    function cardPress() {
        console.log('cardPressed');
    }

    function bookmarkPress() {
        if (bookmarked) {
            setBookmarked(false);
        } else {
            setBookmarked(true);
        }
    }

    return (
        <Card onPress={props.cardPress} style={styles.card}>
            <ImageBackground resizeMode="cover" style={styles.image} source={props.image}>
                <Ionicons name={bookmarked ? "bookmark" : "bookmark-outline"} size={36} color={'#132260'} onPress={bookmarkPress} style={styles.bookmark} />
                {props.buyType!="none"?<Card.Section style={styles.textbox} content={[
                    {text: props.size, style: styles.size},
                    {text: props.buyType+': $'+props.priceAmount, style: styles.size},
                ]}/>:<></>}
            </ImageBackground>
        </Card>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        aspectRatio: 1,
        flex: 1,
    },
    card: {
        height: undefined,
        width: "50%",
        backgroundColor: 'rgba(217,217,217,0)',
    },
    textbox: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        padding: 5,
        width: '50%',
        height: '30%',
        alignSelf: "flex-start",
        backgroundColor: "#92CAFF",
        justifyContent: 'center',
    },
    eventName: {
        fontSize: 40,
        color: 'black',
    },
    bookmark: {
        position: 'absolute',
        alignSelf: "flex-end",
        padding: 20
    },
    size: {
        lineHeight: 0,
        fontSize: 16
    }
});