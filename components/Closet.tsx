import React, {useEffect, useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from 'react-native-ui-lib'
import FilterBar from "@/components/FilterBar";
import ClothingCard from "@/components/ClothingCard";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            arr.push({
                priceAmount: item.is_available_for_sale ? item.purchase_price : item.is_available_for_rent ? item.rental_price : 0,
                buyType: item.is_available_for_sale ? "Sale" : item.is_available_for_rent ? "Rent" : "none",
                bookmarked: false,
                image: item.images[0],
                size: item.size,
                key: item.id
            })
        }
        setClothingItems(
            arr.map((item: any, index: any) => (
                <ClothingCard key={index} image={images("./"+item.image)} bookmarked={item.bookmarked} buyType={item.buyType} priceAmount={item.priceAmount} onPress={cardPress} size={item.size} id={item.key} />
            ))
        );
        setUserID(user);
    }

    useEffect(() => {
        pullProfile();
    }, []);


    return (
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
            <View>
                <FilterBar />
                <View style={styles.recommendedScroll}>
                    {clothingItems}
                </View>
            </View>
        </ScrollView>
    );
};

const styles= StyleSheet.create({
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
    addButton: {
        marginTop: 10,
        backgroundColor: "#92CAFF",
        width: "60%",
        alignSelf: "center"
    },
});

export default Closet;