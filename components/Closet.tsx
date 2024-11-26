import React, {useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import { useUser } from '@clerk/clerk-expo';
import {Button} from 'react-native-ui-lib'
import FilterBar from "@/components/FilterBar";
import ClothingCard from "@/components/ClothingCard";

const Closet = () => {
    const { user } = useUser();
    const firstName = user?.firstName;
    const lastName = user?.lastName;

    const [clothingItems, setClothingItems] = useState(getClothingItems);
    const [organizations, setOrganization] = useState(["LSU", "Acacia"]);
    const [sales, setSales] = useState(10);
    const [disputes, setDisputes] = useState(3);

    function cardPress() {
        console.log('cardPressed');
    }

    function goToAddPage(){
        console.log("goToAddPage");
    }

    function getClothingItems(): any {
        let arr = [
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
            {priceAmount: 20, buyType: "Buy", bookmarked: true, image: require('../assets/images/toga.png'), cardPress: {cardPress}, size: 'Large'},
        ]
        return (
            arr.map((item: any, index: any) => (
                <ClothingCard key={index} image={item.image} bookmarked={item.bookmarked} buyType={item.buyType} priceAmount={item.priceAmount} size={item.size} />
            ))
        );
    }

    return (
        <ScrollView>
            <View style={styles.top}>
                <Image source={require('../assets/images/toga.png')} style={styles.pfp} />
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
                <Text style={styles.name}>{firstName + " " + lastName}</Text>
                {organizations.map((organization, index) => (
                    <Text key={index} style={styles.org}>{organization}</Text>
                ))}
            </View>
            <Button style={styles.addButton} onPress ={goToAddPage}>
                <Text>Add</Text>
            </Button>
            <ScrollView>
                <FilterBar />
                <View style={styles.recommendedScroll}>
                    {clothingItems}
                </View>
            </ScrollView>
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