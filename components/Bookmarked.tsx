import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import ClothingCard from "@/components/ClothingCard";
import {getDownloadURL, ref} from "@firebase/storage";
import {imageDb} from "@/components/firebase";

const Bookmarked = () => {

    const [clothingItems, setClothingItems] = useState<any[]>([]);

    function cardPress() {
        console.log('cardPressed');
    }

    async function pullBookmarks() {
        const userID = await AsyncStorage.getItem("user-id");
        if (userID !== null) {
            let request_body = {user: userID};
            const response = await fetch("https://backend-toga-r5s3.onrender.com/api/bookmarks?"+new URLSearchParams(request_body), {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }
            let items = await response.json();
            let arr: any[] = []
            for (let item of items) {
                const storageRef = ref(imageDb, item.images[0]);
                const url = await getDownloadURL(storageRef)
                arr.push({
                    priceAmount: item.is_available_for_sale ? item.purchase_price : item.is_available_for_rent ? item.rental_price : 0,
                    buyType: item.is_available_for_sale ? "Sale" : item.is_available_for_rent ? "Rent" : "none",
                    bookmarked: true,
                    image: url,
                    size: item.size,
                    key: item.clothing_id
                })
            }
            setClothingItems(
                arr.map((item: any, index: any) => (
                    <ClothingCard key={index} image={item.image} bookmarked={item.bookmarked} buyType={item.buyType} priceAmount={item.priceAmount} onPress={cardPress} size={item.size} id={item.key} />
                ))
            );
        }
    }

    useEffect(() => {
        pullBookmarks();
    }, []);

    return (
        <ScrollView>
            <View style={styles.clothingGrid}>
                {clothingItems}
            </View>
        </ScrollView>
    );
};

export default Bookmarked;

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
    },
    clothingGrid: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
});