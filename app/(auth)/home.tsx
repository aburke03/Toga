import {StyleSheet, View, ScrollView} from 'react-native';
import { Text } from 'react-native-ui-lib';
import React, {useEffect, useState} from 'react';
import {EventCarousel} from "@/components/EventCarousel";
import ClothingCard from "@/components/ClothingCard";
import FilterBar from "@/components/FilterBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import EventCard from "@/components/EventCard";

const Home = () => {

    const images = require.context('../../assets/images', true);

    interface ClothingItem {
        priceAmount: number;
        buyType: string;
        bookmarked: boolean;
        image: string;
        size: string;
        key: number;
    }

    const [clothingCards, setClothingCards] = useState<ClothingItem[]>([]);

    function cardPress() {
        console.log('cardPressed');
    }

    async function loadPage() {
        let user:any;
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
            try {
                const response = await fetch("https://backend-toga-r5s3.onrender.com/api/users/profile", {
                    method: "GET",
                    headers: {
                        'Authorization': "Bearer " + token,
                    },
                })

                if (!response.ok) {
                    router.replace('/login');
                    console.error(`HTTP error! status: ${response.status}`);
                } else {
                    user = await response.json();
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            router.replace('/login');
        }
        const request_body = {organization: user.id};
        const response = await fetch("https://backend-toga-r5s3.onrender.com/api/items?"+new URLSearchParams(request_body), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        } else {
            let items = await response.json();
            let arr = []
            for (let item of items) {
                console.log(item);
                arr.push({
                    priceAmount: item.is_available_for_sale ? item.purchase_price : item.is_available_for_rent ? item.rental_price : 0,
                    buyType: item.is_available_for_sale ? "Sale" : item.is_available_for_rent ? "Rent" : "none",
                    bookmarked: false,
                    image: item.images[0],
                    size: item.size,
                    key: clothingCards.length
                });
            }
            setClothingCards(arr);
        }
    }

    useEffect(() => {
        loadPage();
    }, [])

  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
        <Text style={styles.text}>Your Events</Text>
        <EventCarousel />
        <Text style={styles.suggested}>Suggested</Text>
        <FilterBar />
        <View style={styles.recommendedScroll}>
            {clothingCards.map((item: any, index: any) => (
                <ClothingCard key ={index} image={images("./"+item.image)} bookmarked={item.bookmarked} buyType={item.buyType} priceAmount={item.priceAmount} onPress={cardPress} size={item.size} />
            ))}
        </View>
    </ScrollView>
  );
};

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
export default Home;