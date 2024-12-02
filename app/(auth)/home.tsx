import {StyleSheet, View, ScrollView} from 'react-native';
import { Text } from 'react-native-ui-lib';
import React, {useCallback, useEffect, useState} from 'react';
import {EventCarousel} from "@/components/EventCarousel";
import ClothingCard from "@/components/ClothingCard";
import FilterBar from "@/components/FilterBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, useFocusEffect} from "expo-router";
import EventCard from "@/components/EventCard";
import Closet from "@/components/Closet";
import Spinner from "react-native-loading-spinner-overlay";

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
    const [loading, setLoading] = useState(false);

    function cardPress() {
        console.log('cardPressed');
    }

    async function loadPage() {
        let user:any;
        setLoading(true);
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
                arr.push({
                    priceAmount: item.is_available_for_sale ? item.purchase_price : item.is_available_for_rent ? item.rental_price : 0,
                    buyType: item.is_available_for_sale ? "Sale" : item.is_available_for_rent ? "Rent" : "none",
                    bookmarked: item.is_bookmarked,
                    image: item.images[0],
                    size: item.size,
                    key: item.id
                });
            }
            setClothingCards(arr);
        }
        setLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadPage();
            // Return function is invoked whenever the route gets out of focus.
            return () => {
                console.log('This route is now unfocused.');
            };
        }, [])
    );

  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
        <Spinner visible={loading} />

        <EventCarousel />
        <Text style={styles.suggested}>Suggested for you</Text>
        <FilterBar />
        <View style={styles.recommendedScroll}>
            {clothingCards.map((item: any, index: any) => (
                <ClothingCard key ={index} image={images("./"+item.image)} bookmarked={item.bookmarked} buyType={item.buyType} priceAmount={item.priceAmount} onPress={cardPress} size={item.size} id={item.key} />
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
        fontSize: 24,
        color: 'black',
        margin: 12,
        alignSelf: "center",
        fontWeight: 'bold',

    },
    recommendedScroll: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
    }
});
export default Home;