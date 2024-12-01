import React from "react";
import { Card, Text, Image, View } from 'react-native-ui-lib';
import { StyleSheet } from "react-native";
import { router } from "expo-router";

export default function EventPreview(props: any) {
    const eventBackground = "https://t3.ftcdn.net/jpg/02/75/90/56/360_F_275905630_PzLJAFNCLUQYmzo8icryZdcwZ2LyCeJS.jpg";
    const featuredClothes = [
        "https://pngimg.com/d/dress_PNG156.png",
        "https://e7.pngegg.com/pngimages/925/483/png-clipart-little-black-dress-transparency-clothing-chinese-military-uniform-fashion-party-dress.png",
        "https://image.similarpng.com/very-thumbnail/2021/07/Easy-summer-women's-clothing--on-transparent-background-PNG.png",
    ];

    return (
        <Card 
            style={styles.card}
            onPress={() => router.push("../insideEvent")}
            enableShadow={true}
        >
            <View style={styles.backgroundContainer}>
                <Image 
                    source={{ uri: eventBackground }} 
                    style={styles.image}
                    customOverlayContent={
                        <View style={styles.textbox}>
                            <Text style={styles.eventName}>Rodeo</Text>
                        </View>
                    }
                />
            </View>

            <View style={styles.featuredContainer}>
                {featuredClothes.map((src, index) => (
                    <View key={index} style={styles.featuredWrapper}>
                        <Image 
                            source={{ uri: src }} 
                            style={styles.clothes}
                            customOverlayContent={
                                <View style={styles.clothesOverlay} />
                            }
                        />
                    </View>
                ))}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 340,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginHorizontal: 16,
    },
    backgroundContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    textbox: {
        position: 'absolute',
        bottom: 20,
        left: '10%',
        width: '80%',
        paddingVertical: 16,
        backgroundColor: 'rgba(255,255,255,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    eventName: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
    featuredContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff',
    },
    featuredWrapper: {
        width: '31%',
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    clothes: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    clothesOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.02)',
    }
});