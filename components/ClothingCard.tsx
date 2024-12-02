import {Card} from 'react-native-ui-lib';
import React, {useState} from "react";
import {ImageBackground, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ClothingCard(props: any) {

    const [bookmarked, setBookmarked] = useState(props.bookmarked);

    function cardPress() {
        console.log(props.image);
    }

    async function bookmarkPress() {
        if (bookmarked) {
            const userId = await AsyncStorage.getItem("user-id");
            if (userId !== null) {
                setBookmarked(false);
                const request_body: { user: string, clothing_item: string } = {user: userId, clothing_item: props.id};
                const response = await fetch("https://backend-toga-r5s3.onrender.com/api/bookmarks/remove", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request_body),
                })
            }
        } else {
            const userId = await AsyncStorage.getItem("user-id");
            if (userId !== null) {
                setBookmarked(true);
                const request_body: { user: string, clothing_item: string } = {user: userId, clothing_item: props.id};
                const response = await fetch("https://backend-toga-r5s3.onrender.com/api/bookmarks/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request_body),
                })
            }
        }
    }

    return (
        <Card onPress={props.cardPress} style={styles.card}>
            <ImageBackground resizeMode="cover" style={styles.image} source={{uri: props.image}}>
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