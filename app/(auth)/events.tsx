import { StyleSheet, ScrollView, SafeAreaView, StatusBar, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import EventPreview from "@/components/EventPreview";
import { Text } from 'react-native-ui-lib';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Event {
    event_id: string;
    title: string;
    description: string;
    event_begin: string;
    event_end: string;
    location: string;
    image_url: string;
    organizer_name: string;
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("user-id");

            let url = 'https://backend-toga-r5s3.onrender.com/api/events';
            if (userId) {
                url += `?organization=${userId}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            setEvents(data);
            
        } catch (error) {
            setLoading(false)
            console.error('Error fetching events:', error);
            setError('Failed to load events');
            setEvents([]);
        } finally {
            setLoading(false);
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
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#461D7C" />
                        </View>
                    ) : error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : events.length > 0 ? (
                        events.map((event) => (
                            <EventPreview 
                                key={event.event_id}
                                {...event}
                            />
                        ))
                    ) : (
                        <View style={styles.noEventsContainer}>
                            <Text style={styles.noEventsText}>No events found</Text>
                        </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    noEventsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    noEventsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default Events;