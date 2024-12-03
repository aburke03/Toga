import React, {useEffect, useState} from "react";
import {Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from 'react-native-ui-lib'
import {FilterBar} from "@/components/FilterBar";
import ClothingCard from "@/components/ClothingCard";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddClothes from "@/app/(popups)/addClothesPage";
import { imageDb } from "@/components/firebase";
import {getDownloadURL, ref} from "@firebase/storage";

const Closet = () => {

    const images = require.context('../assets/images', true);

    const [clothingItems, setClothingItems] = useState<any[]>([]);
    const [organizations, setOrganization] = useState(["LSU", "Acacia"]);
    const [sales, setSales] = useState(10);
    const [disputes, setDisputes] = useState(3);
    const [imgUrl, setImgUrl] = useState("");
    const [fullName, setFullName] = useState("");
    const [userID, setUserID] = useState("");

    function cardPress() {
        console.log('cardPressed');
    }

    async function logout() {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user-id");
        router.replace('/login');
    }

    async function pullProfile() {
        let user = ""
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
                    const data = await response.json();
                    setFullName(data.full_name);
                    setImgUrl(data.profile_picture_url);
                    setOrganization(data.organization_names)
                    user = data.id;
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            router.replace('/login');
        }
        let request_body = {user: user};
        const response = await fetch("https://backend-toga-r5s3.onrender.com/api/items?"+new URLSearchParams(request_body), {
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
                bookmarked: item.is_bookmarked,
                image: url,
                size: item.size,
                key: item.id
            })
        }
        setClothingItems(
            arr.map((item: any, index: any) => (
                <ClothingCard key={index} image={item.image} bookmarked={item.bookmarked} buyType={item.buyType} priceAmount={item.priceAmount} onPress={cardPress} size={item.size} id={item.key} />
            ))
        );
        setUserID(user);
    }

    useEffect(() => {
        pullProfile();
    }, []);

    const [addClothesPopup, setAddClothesPopup] = useState(false);

    const openPopup = () => {
        setAddClothesPopup(true);
    }

    const closePopup = () => {
        setAddClothesPopup(false);
    }


    return (
        <View style={styles.closet}>
            <ScrollView>
                <View style={styles.top}>
                    <Pressable onPress={logout}>
                        <Image source={images('./profile.png')} style={styles.pfp} />
                    </Pressable>
                    <View style={styles.sales}>
                        <Text style={styles.text}>Sales</Text>
                        <Text style={styles.text}>{sales}</Text>
                    </View>
                    <View style={styles.sales}>
                        <Text style={styles.text}>Disputes</Text>
                        <Text style={styles.text}>{disputes}</Text>
                    </View>
                </View>
                <View style={styles.organizations}>
                    <Text style={styles.name}>{fullName}</Text>
                    {organizations.map((organization, index) => (
                        <Text key={index} style={styles.org}>{organization}</Text>
                    ))}
                </View>
                <View style={styles.scroll}>
                    <FilterBar />
                    <View style={styles.recommendedScroll}>
                        {clothingItems}
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => router.navigate('/addClothesPage')}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles= StyleSheet.create({
    closet: {
        height: "100%",
        backgroundColor: "white"
    },
    organizations: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: 10
    },
    org: {
        backgroundColor: '#92CAFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    pfp: {
        borderRadius: "50%",
        height: 64,
        width: 64,
    },
    name: {
        padding: 5,
        justifyContent: "center"
    },
    scroll: {
        paddingVertical: 15
    },
    top: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 40,
        paddingTop: 10,
        justifyContent: 'space-between',
    },
    recommendedScroll: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    sales: {
        flexDirection: 'column',
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        margin: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',

    },
    modalText: {
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#92CAFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 100,
        zIndex:10,
        alignSelf: 'center',
        position: 'absolute',
        top: "82%",
    },

    addButtonText: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 16,

    },
});

export default Closet;