import {Card, Text} from 'react-native-ui-lib';
import React, {useState} from "react";
import {Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

export default function ClothingCard(props: any) {
    const windowWidth = Dimensions.get('window').width;
    const itemWidth = (windowWidth - 48) / 2;
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
        <TouchableOpacity
            key={props.id}
            style={[styles.cardWrapper, { width: itemWidth }]}
            onPress={() => router.push({
                pathname: '../(popups)/[id]',
                params: {
                    id: props.id,
                    image: props.image,
                    title: props.title,
                    price: props.priceAmount,
                    size: props.size,
                    buyType: props.buyType,
                    bookmarked: bookmarked,
                    owner: props.owner_id,
                }
            })}
        >
            <TouchableOpacity
                style={styles.bookmarkButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={(e) => {
                    e.stopPropagation();
                    bookmarkPress();
                }}
            >
                <Ionicons name={bookmarked?"bookmark":"bookmark-outline"} size={24} color="#92CAFF" />
            </TouchableOpacity>
            <Image
                source={{ uri: props.image }}
                style={styles.itemImage}
                resizeMode="cover"
            />
            <View style={styles.itemInfo}>
                <View style={styles.infoRow}>
                    <Text style={styles.priceText}>${props.priceAmount}</Text>
                    <View style={styles.sizeContainer}>
                        <Text style={styles.sizeText}>{props.size}</Text>
                    </View>
                </View>
                <Text style={styles.typeText}>{props.buyType}</Text>
            </View>
        </TouchableOpacity>
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
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    filterContainer: {
        marginBottom: 16,
    },
    suggestedTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#000000',
        margin: 20,
    },
    clothingGrid: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    cardWrapper: {
        height: 250,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    itemImage: {
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    itemInfo: {
        padding: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    typeText: {
        fontSize: 14,
        color: '#666666',
    },
    sizeContainer: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    sizeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#666666',
    },
    bookmarkButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    }
});