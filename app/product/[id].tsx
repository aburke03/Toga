import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ProductDetail = () => {
    const params = useLocalSearchParams();

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: params.image as string }}
                style={styles.image}
                resizeMode="cover"
            />

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

                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    image: {
        width: '100%',
        height: undefined,
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
        color: '#461D7C',
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
        color: '#666',
    },
    contactSellerButton: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#461D7C',
    },
    contactSellerText: {
        color: '#461D7C',
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
        backgroundColor: '#461D7C',
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