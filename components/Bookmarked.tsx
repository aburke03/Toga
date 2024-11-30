import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import ClothingCard from "@/components/ClothingCard";

const Bookmarked = () => {

    const [clothingItems, setClothingItems] = useState<any[]>([]);

    const images = require.context('../assets/images', true);

    function cardPress() {
        console.log('cardPressed');
    }

    async function pullBookmarks() {
        const userID = await AsyncStorage.getItem("user-id");
        if (userID !== null) {
            console.log('userID', userID);
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
            console.log(items);
            let arr: any[] = []
            for (let item of items) {
                arr.push({
                    priceAmount: item.is_available_for_sale ? item.purchase_price : item.is_available_for_rent ? item.rental_price : 0,
                    buyType: item.is_available_for_sale ? "Sale" : item.is_available_for_rent ? "Rent" : "none",
                    bookmarked: true,
                    image: item.images[0],
                    size: item.size,
                    key: item.clothing_id
                })
            }
            setClothingItems(
                arr.map((item: any, index: any) => (
                    <ClothingCard key={index} image={images("./"+item.image)} bookmarked={item.bookmarked} buyType={item.buyType} priceAmount={item.priceAmount} onPress={cardPress} size={item.size} id={item.key} />
                ))
            );
        }
    }

    useEffect(() => {
        pullBookmarks();
    }, []);

    return (
        <ScrollView>
            <View style={styles.recommendedScroll}>
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
    }
});