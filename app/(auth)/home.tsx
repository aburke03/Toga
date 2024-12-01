import {StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, Image} from 'react-native';
import { Text } from 'react-native-ui-lib';
import React, {useEffect, useState} from 'react';
import {EventCarousel} from "@/components/EventCarousel";
import ClothingCard from "@/components/ClothingCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import { Ionicons } from '@expo/vector-icons';

interface ClothingItem {
    priceAmount: number;
    buyType: string;
    bookmarked: boolean;
    image: any;
    size: string;
    key: number;
}

const Home = () => {
    const [clothingCards, setClothingCards] = useState<ClothingItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const windowWidth = Dimensions.get('window').width;
    
    const itemWidth = (windowWidth - 48) / 2;

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

        const sampleItems = [
            { image: require('../../assets/images/denim_jacket.png'), price: 49.99, type: 'Sale', size: 'M' },
            { image: require('../../assets/images/dressPNG.png'), price: 89.99, type: 'Rent', size: 'S' },
        ];

        setClothingCards(sampleItems.map((item, index) => ({
            priceAmount: item.price,
            buyType: item.type,
            bookmarked: false,
            image: item.image,
            size: item.size,
            key: index
        })));
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <EventCarousel />
            
            <View style={styles.filterContainer}>
                <Text style={styles.suggestedTitle}>Suggested</Text>
                
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.categoryScroll}
                    contentContainerStyle={styles.categoryScrollContent}
                >
                    {['All', 'Tops', 'Bottoms', 'Shoes', "Hats", "Accessories"].map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.categoryButtonActive
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === category && styles.categoryTextActive
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.clothingGrid}>
                {clothingCards.map((item, index) => (
                    <View key={index} style={[styles.cardWrapper, { width: itemWidth }]}>
                        <TouchableOpacity 
                            style={styles.bookmarkButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="bookmark-outline" size={24} color="#461D7C" />
                        </TouchableOpacity>
                        <Image 
                            source={item.image} 
                            style={styles.itemImage}
                            resizeMode="cover"
                        />
                        <View style={styles.itemInfo}>
                            <View style={styles.infoRow}>
                                <Text style={styles.priceText}>${item.priceAmount}</Text>
                                <View style={styles.sizeContainer}>
                                    <Text style={styles.sizeText}>{item.size}</Text>
                                </View>
                            </View>
                            <Text style={styles.typeText}>{item.buyType}</Text>
                        </View>
                    </View>
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
    categoryScroll: {
        marginBottom: 8,
    },
    categoryScrollContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    categoryButtonActive: {
        backgroundColor: '#000000',
    },
    categoryText: {
        color: '#666666',
        fontWeight: '600',
        fontSize: 15,
    },
    categoryTextActive: {
        color: '#ffffff',
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