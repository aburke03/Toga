import { StyleSheet, ScrollView, SafeAreaView, StatusBar, View } from 'react-native';
import React from 'react';
import EventPreview from "@/components/EventPreview";
import { Text } from 'react-native-ui-lib';

const Events = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Events</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.eventsContainer}>
                    <EventPreview />
                    <EventPreview />
                    <EventPreview />
                    <EventPreview />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 16,
    },
    eventsContainer: {
        gap: 24, // Space between event previews
        alignItems: 'center', // Center the cards horizontally
    }
});

export default Events;