import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {getDownloadURL, ref} from "@firebase/storage";
import {imageDb} from "@/components/firebase";
import ClothingCard from "@/components/ClothingCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EventClothesSelect: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
}> = ({ isVisible, onClose, onSelect}) => {

    const [clothingItems, setClothingItems] = useState<any[]>([]);

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
            let arr: any[] = []
            for (let item of items) {
                const storageRef = ref(imageDb, item.images[0]);
                const url = await getDownloadURL(storageRef)
                arr.push({
                    priceAmount: item.is_available_for_sale ? item.purchase_price : item.is_available_for_rent ? item.rental_price : 0,
                    buyType: item.is_available_for_sale ? "Sale" : item.is_available_for_rent ? "Rent" : "none",
                    bookmarked: item.is_bookmarked,
                    image: url,
                    size: item.size,
                    key: item.id,
                    onPress: handleSelect
                })
            }
            setClothingItems(arr);
        }
    }

    const handleSelect = (option: string) => {
        onSelect(option);
        onClose();
    };

    useEffect(() => {
        pullCloset();
    }, []);

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <ScrollView style={styles.modalContent}>
                    <Text style={styles.title}>Add an Item</Text>
                    <View style={styles.clothingGrid}>
                    {clothingItems.map((item) => (
                        <TouchableOpacity key={item.key} style={styles.itemCard} onPress={() => handleSelect(item.key)}>
                            <View style={styles.itemImage}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemPrice}>{item.priceAmount}</Text>
                                <Text style={styles.itemSize}>{"Size " + item.size}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height: '40%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop: 30,
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
    clothingGrid: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#555',
        marginRight: 10,
    },
    radioSelected: {
        backgroundColor: '#555',
    },
    radioText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: '10%',
        padding: 10,
        backgroundColor: '#132260',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
    },
});
