import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Purchase, CART_STORAGE_KEY, PURCHASES_STORAGE_KEY } from './types';

export default function PostPaymentSchedule() {
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showDayError, setShowDayError] = useState(false);
    const [showTimeError, setShowTimeError] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = async () => {
        try {
            const cartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
            if (cartJson) {
                setCartItems(JSON.parse(cartJson));
            }
        } catch (error) {
            console.error('Error loading cart items:', error);
        }
    };

    const availableDays = [
        {
            date: 'Dec 4',
            timeSlots: [
                { time: '11:00am', available: true },
                { time: '3:00pm', available: true },
                { time: '6:00pm', available: true }
            ]
        },
        {
            date: 'Dec 5',
            timeSlots: [
                { time: '11:00am', available: true },
                { time: '3:00pm', available: true },
                { time: '6:00pm', available: true }
            ]
        },
        {
            date: 'Dec 6',
            timeSlots: [
                { time: '11:00am', available: true },
                { time: '3:00pm', available: true },
                { time: '6:00pm', available: true }
            ]
        }
    ];

    const toggleDate = (date: string) => {
        if (selectedDay === date) {
            setSelectedDay(null);
            setSelectedTime(null);
        } else {
            setSelectedDay(date);
            setSelectedTime(null);
        }
        setShowDayError(false);
    };

    const toggleTime = (date: string, time: string) => {
        if (date !== selectedDay) {
            setShowDayError(true);
            return;
        }
        
        if (selectedTime === time) {
            setSelectedTime(null);
        } else {
            setSelectedTime(time);
        }
        setShowTimeError(false);
    };

    const handleNext = async () => {
        if (!selectedDay) {
            setShowDayError(true);
            return;
        }

        if (!selectedTime) {
            setShowTimeError(true);
            return;
        }

        try {
            const existingPurchasesJson = await AsyncStorage.getItem(PURCHASES_STORAGE_KEY);
            const existingPurchases: Purchase[] = existingPurchasesJson 
                ? JSON.parse(existingPurchasesJson) 
                : [];

            const newPurchases: Purchase[] = cartItems.map(item => ({
                ...item,
                selectedDay,
                selectedTime,
                purchaseDate: new Date().toISOString()
            }));

            const updatedPurchases = [...existingPurchases, ...newPurchases];

            await AsyncStorage.setItem(
                PURCHASES_STORAGE_KEY, 
                JSON.stringify(updatedPurchases)
            );

            await AsyncStorage.removeItem(CART_STORAGE_KEY);
            router.push('/chat');
        } catch (error) {
            console.error('Error saving purchases:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </Pressable>
                <Text style={styles.title}>Schedule Pickup</Text>
            </View>

            <ScrollView>
                {cartItems.map((item, index) => (
                    <View key={item.id} style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDescription}>
                            {item.size} - ${item.price.toFixed(2)}
                        </Text>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Select available days for pickup:</Text>
                {showDayError && (
                    <Text style={styles.errorText}>Please select exactly one day</Text>
                )}
                
                <View style={styles.datesContainer}>
                    {availableDays.map(day => (
                        <View key={day.date} style={styles.dayContainer}>
                            <Pressable 
                                style={[
                                    styles.dateButton,
                                    selectedDay === day.date && styles.dateButtonSelected
                                ]}
                                onPress={() => toggleDate(day.date)}
                            >
                                <Text style={[
                                    styles.dateText,
                                    selectedDay === day.date && styles.dateTextSelected
                                ]}>
                                    {day.date}
                                </Text>
                            </Pressable>

                            {selectedDay === day.date && (
                                <View style={styles.timeSlotsContainer}>
                                    {showTimeError && (
                                        <Text style={styles.errorText}>Please select exactly one time slot</Text>
                                    )}
                                    {day.timeSlots.map(slot => (
                                        <Pressable
                                            key={slot.time}
                                            style={[
                                                styles.timeSlot,
                                                selectedTime === slot.time && styles.timeSlotSelected
                                            ]}
                                            onPress={() => toggleTime(day.date, slot.time)}
                                        >
                                            <Text style={[
                                                styles.timeText,
                                                selectedTime === slot.time && styles.timeTextSelected
                                            ]}>
                                                {slot.time}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable 
                    style={styles.nextButton}
                    onPress={handleNext}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemInfo: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        padding: 20,
        paddingBottom: 10,
    },
    datesContainer: {
        flex: 1,
        padding: 20,
    },
    dayContainer: {
        marginBottom: 20,
    },
    dateButton: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    dateButtonSelected: {
        backgroundColor: '#000',
    },
    dateText: {
        fontSize: 16,
        color: '#000',
    },
    dateTextSelected: {
        color: '#fff',
    },
    timeSlotsContainer: {
        marginTop: 10,
        marginLeft: 20,
    },
    timeSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
    },
    timeSlotSelected: {
        backgroundColor: '#000',
    },
    timeText: {
        fontSize: 14,
        color: '#000',
    },
    timeTextSelected: {
        color: '#fff',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    nextButton: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
        marginBottom: 8,
        paddingHorizontal: 20,
    },
});