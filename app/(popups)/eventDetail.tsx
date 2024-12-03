import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface EventDetail {
    title: string;
    description: string;
    event_date: string;
    location: string;
    image_url: string;
    organizer_name: string;
}

export default function EventDetailScreen() {
    const params = useLocalSearchParams();
    
    // Hardcoded stats for demonstration
    const memberCount = 156;
    const popularity = 89;

    return (
        <>
            <Stack.Screen 
                options={{
                    headerShown: false
                }}
            />
            
            <ScrollView style={styles.container}>
                {/* Header Image Section */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: params.image_url as string }}
                        style={styles.headerImage}
                    />
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>{params.title}</Text>
                        <Text style={styles.date}>{new Date(params.event_date as string).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</Text>
                    </View>

                    {/* Stats Section */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Ionicons name="people-outline" size={24} color="black" />
                            <Text style={styles.statText}>{memberCount} Members</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="thumbs-up-outline" size={24} color="black" />
                            <Text style={styles.statText}>{popularity}% Popularity</Text>
                        </View>
                        <TouchableOpacity style={styles.bookmarkButton}>
                            <Ionicons name="bookmark-outline" size={24} color="#92CAFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Host Section */}
                    <View style={styles.hostSection}>
                        <Text style={styles.sectionTitle}>Hosted by</Text>
                        <View style={styles.hostInfo}>
                            <View style={styles.orgAvatar}>
                                <Text style={styles.orgInitial}>{params.organizer_name?.charAt(0)}</Text>
                            </View>
                            <View>
                                <Text style={styles.hostName}>{params.organizer_name}</Text>
                                <Text style={styles.hostLocation}>{params.location}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Description Section */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>About this event</Text>
                        <Text style={styles.description}>{params.description}</Text>
                    </View>

                    {/* Featured Items Section */}
                    <View style={styles.itemsSection}>
                        <Text style={styles.sectionTitle}>Featured Items</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            style={styles.itemsScroll}
                        >
                            {/* Sample items - replace with actual data */}
                            {[1, 2, 3].map((item) => (
                                <TouchableOpacity key={item} style={styles.itemCard}>
                                    <View style={styles.itemImage} />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemPrice}>$20</Text>
                                        <Text style={styles.itemSize}>Size M</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Bottom Action Button */}
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Join Event</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: 300,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 44,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
        marginTop: -40,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    titleSection: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        color: '#4788B7',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        marginBottom: 24,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
    },
    bookmarkButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    hostSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    hostInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    orgAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#92CAFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orgInitial: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    hostName: {
        fontSize: 16,
        fontWeight: '600',
    },
    hostLocation: {
        fontSize: 14,
        color: '#666',
    },
    descriptionSection: {
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
    itemsSection: {
        marginBottom: 100,
    },
    itemsScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    itemCard: {
        width: 160,
        marginRight: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    itemInfo: {
        padding: 12,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemSize: {
        fontSize: 14,
        color: '#666',
    },
    actionButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#6BA9DB',
        paddingVertical: 16,
        margin: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});