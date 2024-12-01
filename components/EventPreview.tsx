import React from "react";
import {Card, Text, View, Image} from 'react-native-ui-lib';
import {StyleSheet, ImageBackground} from "react-native";
import {router} from "expo-router";

interface EventPreviewProps {
    event_id: string;
    title: string;
    description: string;
    event_begin: string;
    event_end: string;
    location: string;
    image_url: string;
    organizer_name: string;
}

export default function EventPreview({ 
    title, 
    description, 
    event_begin, 
    location, 
    image_url, 
    organizer_name 
}: EventPreviewProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
            day: date.getDate(),
            time: date.toLocaleString('default', { hour: 'numeric', minute: '2-digit' })
        };
    };

    const dateInfo = formatDate(event_begin);

    const getImageSource = () => {
        // Default thrift store image
        const defaultImage = require('@/assets/images/event1.jpg');
        
        if (!image_url) return defaultImage;
        
        // If it's a full URL (starts with http or https)
        if (image_url.startsWith('http')) {
            return { uri: image_url };
        }
        
        // If it's just a filename like 'event.jpg', use default image
        return defaultImage;
    };
    

    return (
        <Card onPress={() => router.push("../insideEvent")} style={styles.card}>
            <ImageBackground
                source={getImageSource()}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
                defaultSource={require('@/assets/images/event1.jpg')}
            >
                <View style={styles.dateContainer}>
                    <Text style={styles.monthText}>{dateInfo.month}</Text>
                    <Text style={styles.dayText}>{dateInfo.day}</Text>
                    <Text style={styles.timeText}>{dateInfo.time}</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.host}>Host: {organizer_name}</Text>
                </View>
            </ImageBackground>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 8,
        backgroundColor: 'transparent',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    imageStyle: {
        borderRadius: 20,
    },
    dateContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 12,
        borderRadius: 12,
        margin: 16,
        alignItems: 'center',
    },
    monthText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    dayText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    host: {
        fontSize: 16,
        color: '#461D7C',
        fontWeight: '500',
    }
});