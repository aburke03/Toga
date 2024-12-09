import {StyleSheet, View, ScrollView} from 'react-native';
import { Text } from 'react-native-ui-lib';
import React, {useEffect, useState} from 'react';
import {EventCarousel} from "@/components/EventCarousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import {getDownloadURL, ref} from "@firebase/storage";
import {imageDb} from "@/components/firebase";
import {FilterBar} from "@/components/FilterBar";
import ClothingCard from "@/components/ClothingCard";

const Home = () => {

interface ClothingItem {
    priceAmount: number;
    buyType: string;
    bookmarked: boolean;
    image: string;
    size: string;
    key: number;
    title: string;
    owner_id: string;
    id: string;
}

    const [clothingCards, setClothingCards] = useState<ClothingItem[]>([]);

    async function checkLogin() {
        let user:any;
        const token = await AsyncStorage.getItem("token");

        // Gather User's ID and validate login token
        if (token !== null) {
            try {
                const response = await fetch("https://backend-toga-r5s3.onrender.com/api/users/profile", {
                    method: "GET",
                    headers: {
                        'Authorization': "Bearer " + token,
                    },
                });

                if (!response.ok) {
                    router.replace('/login');
                } else {
                    user = await response.json();
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            router.replace('/login');
        }
        return user.id;
    }

    async function getImgUrl(img: string) {
        const storageRef = ref(imageDb, img);
        return await getDownloadURL(storageRef)
    }

    async function pullItems(userId: string) {
        const request_body = {organization: userId};
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
            let arr = [];
            for (let i=0; i<items.length; i++) {
                let img = await getImgUrl(items[i].images[0]);
                arr.push({
                    priceAmount: items[i].is_available_for_sale ? items[i].purchase_price :
                        items[i].is_available_for_rent ? items[i].rental_price : 0,
                    buyType: items[i].is_available_for_sale ? "Sale" :
                        items[i].is_available_for_rent ? "Rent" : "none",
                    bookmarked: false,
                    image: img,
                    size: items[i].size,
                    key: items[i].id,
                    title: items[i].title,
                    owner_id: items[i].owner_id,
                    id: items[i].id
                })
            }
            setClothingCards(arr);
        }
    }

    async function loadPage() {
        const userId = await checkLogin();
        await pullItems(userId);
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <ScrollView style={styles.container}>

            <EventCarousel />

            <View style={styles.filterContainer}>
                <Text style={styles.suggestedTitle}>Suggested</Text>
                <FilterBar/>
            </View>

            <View style={styles.clothingGrid}>
                {clothingCards.map((item, index) => (
                    <ClothingCard id={item.id} key={index} priceAmount={item.priceAmount} buyType={item.buyType} bookmarked={item.bookmarked} image={item.image} owner={item.owner_id} size={item.size} title={item.title} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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

export default Home;