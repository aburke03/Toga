import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TextField } from "react-native-ui-lib";
import MyCamera from "@/app/(popups)/MyCamera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { imageDb } from "@/components/firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { CameraCapturedPicture } from "expo-camera";

export const AddClothes = () => {
    const [selectedValues, setSelectedValues] = useState({
        category: "Select  >",
        condition: "Select  >",
        color: "Select  >",
        size: "Select  >",
    });
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentOptions, setCurrentOptions] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [takingPicture, setTakingPicture] = useState(false);
    const [picture, setPicture] = useState('');
    const [price, setPrice] = useState("0.00");

    const options = {
        category: ['Tops', 'Bottoms', 'Shoes', 'Accessories'],
        condition: ['New', 'Like New', 'Good', 'Fair'],
        color: ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Purple', 'Pink', 'Brown', 'Gray'],
        size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    };

    const handleOptionPress = (field: string) => {
        setCurrentField(field);
        setCurrentOptions(options[field as keyof typeof options]);
        setShowModal(true);
    };

    const handleOptionSelect = (value: string) => {
        setSelectedValues(prev => ({
            ...prev,
            [currentField]: value
        }));
        setShowModal(false);
    };

    const handlePriceInput = (text: string) => {
        const filtered = text.replace(/[^0-9.]/g, '');
        const parts = filtered.split('.');
        if (parts.length > 2) return;
        if (parts[1]?.length > 2) return;
        setPrice(filtered);
    };

    async function uploadImage(fileName: string) {
        try {
            const response = await fetch(picture);

            const firebaseStorageRef = ref(imageDb, 'images/' + fileName);
            const firebaseBlob = await response.blob();
            await uploadBytes(firebaseStorageRef, firebaseBlob);
            const downloadUrl = await getDownloadURL(firebaseStorageRef);

            const apiKey = "6QmVc1MeSWvEagaBLyy5Ufq9";

            const formData = new FormData();
            formData.append('image_url', downloadUrl);
            formData.append('size', 'preview');
            formData.append('format', 'jpg');

            try {
                const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                    method: 'POST',
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    console.error('remove.bg API error:', await response.text());
                    return null;
                }

                const removebgStorageRef = ref(imageDb, 'images/transparent' + fileName);
                const removebgBlob = await response.blob();
                const uploadTask = await uploadBytes(removebgStorageRef, removebgBlob);
                return uploadTask.ref.fullPath;
            } catch (error) {
                console.error('Error removing background:', error);
            }
        } catch (error) {
            console.error('Error uploading file to firebase:', error);
        }
    }

    const handleAddToWardrobe = async () => {
        const imageUrl = await uploadImage(Date.now()+"_image.jpg");

        const user = await AsyncStorage.getItem("user-id");
        const requestBody = {
            category: selectedValues.category,
            condition: selectedValues.condition,
            description: description,
            size: selectedValues.size,
            title: name,
            rental_price: 0,
            purchase_price: parseFloat(price),
            images: [imageUrl],
            owner: user
        }
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch("https://backend-toga-r5s3.onrender.com/api/items/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log(data);
            router.replace("/profile");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleTakenPicture = (photo: CameraCapturedPicture) => {
        setPicture(photo.uri);
        setTakingPicture(false);
    };

    if (takingPicture) {
        return <MyCamera handleTakenPicture={handleTakenPicture}/>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Toga",
                    headerStyle: {
                        backgroundColor: '#92CAFF',
                    },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.replace("/profile")}
                            style={styles.headerButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    )
                }}
            />
            
            <ScrollView style={styles.content}>
                <TouchableOpacity 
                    style={styles.imageUploadArea} 
                    onPress={() => setTakingPicture(true)}
                >
                    {picture ? (
                        <Image
                            source={{ uri: picture }}
                            style={styles.uploadedImage}
                        />
                    ) : (
                        <Ionicons name="camera" size={48} color="#000" />
                    )}
                </TouchableOpacity>

                <TextField
                    placeholder="Enter the item's title"
                    value={name}
                    onChangeText={setName}
                    maxLength={30}
                    showCharCounter
                    containerStyle={styles.textInput}
                    style={styles.input}
                    placeholderTextColor="#666"
                />

                <TextField
                    placeholder="Describe your item (condition, features, etc.)"
                    value={description}
                    onChangeText={setDescription}
                    maxLength={80}
                    showCharCounter
                    multiline
                    containerStyle={styles.textInput}
                    style={styles.input}
                    placeholderTextColor="#666"
                />

                <TouchableOpacity 
                    style={styles.fieldRow}
                    onPress={() => {}}
                >
                    <Text style={styles.fieldLabel}>Sell Price</Text>
                    <TextField
                        placeholder= {'0.00'}
                        placeholderTextColor={'grey'}
                        onChangeText={handlePriceInput}
                        keyboardType="decimal-pad"
                        style={styles.priceInput}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.fieldRow}
                    onPress={() => handleOptionPress('category')}
                >
                    <Text style={styles.fieldLabel}>Category</Text>
                    <Text style={styles.fieldValue}>{selectedValues.category}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.fieldRow}
                    onPress={() => handleOptionPress('condition')}
                >
                    <Text style={styles.fieldLabel}>Condition</Text>
                    <Text style={styles.fieldValue}>{selectedValues.condition}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.fieldRow}
                    onPress={() => handleOptionPress('color')}
                >
                    <Text style={styles.fieldLabel}>Color</Text>
                    <Text style={styles.fieldValue}>{selectedValues.color}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.fieldRow}
                    onPress={() => handleOptionPress('size')}
                >
                    <Text style={styles.fieldLabel}>Size</Text>
                    <Text style={styles.fieldValue}>{selectedValues.size}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={handleAddToWardrobe}
                >
                    <Text style={styles.addButtonText}>Add to Wardrobe</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{`Select ${currentField}`}</Text>
                        {currentOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalOption}
                                onPress={() => handleOptionSelect(option)}
                            >
                                <Text style={styles.modalOptionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity 
                            style={styles.modalCancelButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    headerButton: {
        paddingHorizontal: 16,
    },
    imageUploadArea: {
        width: '100%',
        aspectRatio: 1,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderRadius: 4,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textInput: {
        marginBottom: 24,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 50,
    },
    placeholderText: {
        fontSize: 16,
        color: '#black',
        marginBottom: 8,
    },
    hint: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        marginLeft: 16,
    },
    input: {
        fontSize: 16,
        color: '#000',
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    fieldLabel: {
        fontSize: 18,
        fontWeight: '500',
    },
    fieldValue: {
        fontSize: 18,
        color: '#666',
    },
    priceInput: {
        fontSize: 18,
        textAlign: 'right',
        color: '#666',
        minWidth: 60,
    },
    addButton: {
        backgroundColor: '#4788B7',
        padding: 16,
        borderRadius: 8,
        marginTop: 30,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalOption: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalOptionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    modalCancelButton: {
        marginTop: 16,
        paddingVertical: 16,
    },
    modalCancelText: {
        fontSize: 18,
        color: '#007AFF',
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default AddClothes;