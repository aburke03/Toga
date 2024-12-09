import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {getDownloadURL, ref} from "@firebase/storage";
import {imageDb} from "@/components/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EventClothesSelect: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
}> = ({ isVisible, onClose, onSelect}) => {

    const [clothingItems, setClothingItems] = useState<any[]>([]);

    async function setClothes(items: any[]) {
        let arr: any[] = []
        for (let item of items) {
            const storageRef = ref(imageDb, item.images[0]);
            const url = await getDownloadURL(storageRef)
            const priceAmount = item.is_available_for_sale ?
                Number(item.purchase_price) || 0 :
                item.is_available_for_rent ?
                    Number(item.rental_price) || 0 :
                    0;

            arr.push({
                priceAmount,
                buyType: item.is_available_for_sale ? "Sale" : item.is_available_for_rent ? "Rent" : "none",
                bookmarked: item.is_bookmarked,
                image: url,
                size: item.size,
                key: item.id
            })
        }
        setClothingItems(arr);
    }

    async function pullCloset() {
        const userId = await AsyncStorage.getItem("user-id");
        if (userId) {
            let request_body = {user: userId};
            const response = await fetch("https://backend-toga-r5s3.onrender.com/api/items?" + new URLSearchParams(request_body), {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }
            let items = await response.json();
            await setClothes(items);
        }
    }

    const handleSelect = (option: string) => {
        onSelect(option);
        onClose();
    };

    useEffect(() => {
        if (isVisible) {
            pullCloset();
        }
    }, [isVisible]);

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Add an Item</Text>
                    <ScrollView style={styles.scrollContent}>
                        <View style={styles.clothingGrid}>
                            {clothingItems.map((item) => (
                                <TouchableOpacity 
                                    key={item.key} 
                                    style={styles.itemCard} 
                                    onPress={() => handleSelect(item.key)}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.itemImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemPrice}>
                                            ${typeof item.priceAmount === 'number' ? item.priceAmount.toFixed(2) : '0.00'}
                                        </Text>
                                        <Text style={styles.itemSize}>Size {item.size}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                    <TouchableOpacity 
                        onPress={onClose} 
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%',
        width: '100%',
        paddingBottom: 34,
        // Add shadow styles
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,  // Negative value for top shadow
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 16,  // For Android
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    scrollContent: {
        flexGrow: 0,
    },
    clothingGrid: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    itemCard: {
        width: '47%',
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 8,
    },
    itemImage: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f0f0f0',
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
        marginTop: 4,
    },
    closeButton: {
        backgroundColor: '#6BA9DB',
        marginHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default EventClothesSelect;