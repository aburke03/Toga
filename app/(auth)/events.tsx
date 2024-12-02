import { StyleSheet, ScrollView, SafeAreaView, StatusBar, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import EventPreview from "@/components/EventPreview";
import { Text } from 'react-native-ui-lib';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Events = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchEvents = async (pageNum = 1, isRefresh = false) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("user-id");

            let url = `https://backend-toga-r5s3.onrender.com/api/events?page=${pageNum}&limit=10`;
            if (userId) {
                url += `&organization=${userId}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (Array.isArray(data)) {
                if (isRefresh) {
                    setEvents(data);
                } else {
                    setEvents(prevEvents => [...(prevEvents || []), ...data]);
                }
                setHasMore(data.length === 10);
            }
            
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Events</Text>
            </View>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.eventsContainer}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : events.length > 0 ? (
                        events.map((event) => (
                            <EventPreview 
                                key={event.event_id}
                                {...event}
                            />
                        ))
                    ) : (
                        <Text>No events found</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 10,
    },
    eventsContainer: {
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 16,
    },
});

export default Events;