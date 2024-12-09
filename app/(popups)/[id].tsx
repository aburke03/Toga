import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Text } from 'react-native-ui-lib';
import React, {useState} from 'react';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, CART_STORAGE_KEY } from '../types';

const ProductDetail = () => {
    const params = useLocalSearchParams();
    const [bookmarked, setBookmarked] = useState<any>(params.bookmarked);

    const handleAddToCart = async () => {
        try {
            const cartItem: CartItem = {
                id: params.id as string,
                title: params.title as string,
                price: Number(params.price),
                size: params.size as string,
                buyType: params.buyType as string,
                image: params.image as string
            };

            const existingCartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
            const existingCart: CartItem[] = existingCartJson ? JSON.parse(existingCartJson) : [];
            const itemExists = existingCart.some(item => item.id === cartItem.id);

            if (itemExists) {
                Alert.alert('Already in Cart', 'This item is already in your cart.');
                return;
            }

            const updatedCart = [...existingCart, cartItem];
            await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

            Alert.alert(
                'Success',
                'Item added to cart',
                [
                    {
                        text: 'View Cart',
                        onPress: () => router.push('/cart'),
                    },
                    {
                        text: 'Continue Shopping',
                        style: 'cancel',
                    },
                ]
            );
        } catch (error) {
            console.error('Error adding to cart:', error);
            Alert.alert('Error', 'Failed to add item to cart. Please try again.');
        }
    };

    async function bookmarkPress() {
        if (bookmarked) {
            const userId = await AsyncStorage.getItem("user-id");
            if (userId !== null) {
                setBookmarked(false);
                const request_body: { user: string, clothing_item: string } = {user: userId, clothing_item: params.id[0]};
                await fetch("https://backend-toga-r5s3.onrender.com/api/bookmarks/remove", {
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
                const request_body: { user: string, clothing_item: string } = {user: userId, clothing_item: params.id[0]};
                await fetch("https://backend-toga-r5s3.onrender.com/api/bookmarks/add", {
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
        <>
            <Stack.Screen
                options={{
                    title: "Toga",
                    headerLeft: () => (
                        <TouchableOpacity 
                            onPress={() => router.replace('/home')}
                            style={styles.headerButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={styles.headerRightContainer}>
                            <TouchableOpacity 
                                onPress={() => {bookmarkPress()}}
                                style={styles.headerButton}
                            >
                                <Ionicons name={bookmarked?"bookmark":"bookmark-outline"} size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => {/* Add share functionality */}}
                                style={styles.headerButton}
                            >
                                <Ionicons name="share-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    ),
                }} 
            />
            
            <ScrollView style={styles.container}>
                <View style={{ width: "100%", height: undefined, aspectRatio: 1 }}>
                    <Image
                        source={{ uri: params.image as string }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain" // Or "cover" if you want cropping
                    />
                </View>

                <View style={styles.details}>
                    <Text style={styles.title}>{params.title as string}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>${params.price}</Text>
                        <View style={styles.buyTypeContainer}>
                            <Text style={styles.buyType}>{params.buyType}</Text>
                        </View>
                    </View>

                    <View style={styles.sellerInfo}>
                        <View style={styles.sellerHeader}>
                            <View>
                                <Text style={styles.sellerName}>John's Closet</Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Text style={styles.rating}>4.8</Text>
                                    <Text style={styles.ratingCount}>(256 sales)</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.contactSellerButton}>
                                <Text style={styles.contactSellerText}>Contact Seller</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Item Details</Text>
                    <View style={styles.itemDetails}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Size</Text>
                            <Text style={styles.detailValue}>{params.size}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Condition</Text>
                            <Text style={styles.detailValue}>Excellent</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>
                        Premium quality piece in excellent condition. Perfect for any occasion.
                        Minimal wear and tear, well maintained.
                    </Text>

                    <TouchableOpacity
                     style={styles.addToCartButton}
                     onPress={handleAddToCart}
                     >
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerRightContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    headerButton: {
        paddingHorizontal: 8,
    },
    image: {
        width: "100%",
        height: "100%",borderWidth: 10, borderColor: "black"
    },
    details: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: '600',
        color: '#4788B7',
    },
    buyTypeContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    buyType: {
        fontSize: 16,
        color: '#666',
    },
    sellerInfo: {
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    sellerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sellerName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
    },
    ratingCount: {
        color: '#4788B7',
    },
    contactSellerButton: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6BA9DB',
    },
    contactSellerText: {
        color: '#6BA9DB',
        fontSize: 14,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    itemDetails: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detailLabel: {
        color: '#666',
    },
    detailValue: {
        fontWeight: '500',
    },
    description: {
        color: '#666',
        lineHeight: 22,
        marginBottom: 24,
    },
    addToCartButton: {
        backgroundColor: '#92CAFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProductDetail;