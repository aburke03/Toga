import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Purchase, PURCHASES_STORAGE_KEY } from '../app/types';

const Purchasing = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const navigation = useNavigation();

    const loadPurchases = async () => {
        try {
            const storedPurchases = await AsyncStorage.getItem(PURCHASES_STORAGE_KEY);
            if (storedPurchases) {
                setPurchases(JSON.parse(storedPurchases));
            }
        } catch (error) {
            console.error('Error loading purchases:', error);
        }
    };

    useEffect(() => {
        loadPurchases();

        // Reload purchases when the screen comes into focus
        const unsubscribe = navigation.addListener('focus', () => {
            loadPurchases();
        });

        return unsubscribe;
    }, [navigation]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <ScrollView style={styles.container}>
            {purchases.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No purchases yet</Text>
                </View>
            ) : (
                purchases.map((purchase, index) => (
                    <View key={`${purchase.id}-${index}`} style={styles.purchaseCard}>
                        {purchase.image && (
                            <Image
                                source={{ uri: purchase.image }}
                                style={styles.itemImage}
                                resizeMode="cover"
                            />
                        )}
                        
                        <View style={styles.header}>
                            <Text style={styles.title}>{purchase.title}</Text>
                            <Text style={styles.price}>${purchase.price.toFixed(2)}</Text>
                        </View>
                        
                        <Text style={styles.description}>
                            {purchase.size} - {purchase.buyType}
                        </Text>
                        
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateLabel}>Purchased on:</Text>
                            <Text style={styles.dateText}>{formatDate(purchase.purchaseDate)}</Text>
                        </View>

                        <View style={styles.scheduledTimes}>
                            <Text style={styles.scheduledTimesTitle}>Scheduled Pickup Time:</Text>
                            <View style={styles.timeSlot}>
                                <Text style={styles.dateText}>{purchase.selectedDay}:</Text>
                                <Text style={styles.timeText}>
                                    {purchase.selectedTime}
                                </Text>
                            </View>
                            <View style={styles.locationContainer}>
                                <Text style={styles.locationText}>Pickup Location: Alpha Delta Pi House</Text>
                            </View>
                        </View>

                        <Pressable style={styles.messageButton}>
                            <Ionicons name="chatbubble-outline" size={20} color="white" />
                            <Text style={styles.messageButtonText}>Message Seller</Text>
                        </Pressable>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
    },
    purchaseCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    dateLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '500',
    },
    scheduledTimes: {
        marginTop: 8,
    },
    scheduledTimesTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    timeSlot: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    timeText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    locationContainer: {
        marginTop: 4,
        marginBottom: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#666',
    },
    messageButton: {
        flexDirection: 'row',
        backgroundColor: '#92CAFF',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    messageButtonText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    itemImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginBottom: 12,
    },
});

export default Purchasing;