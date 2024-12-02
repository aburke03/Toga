import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    Modal,
    Button,
} from 'react-native';
import { OptionRow } from '@/components/addingClothes/OptionRow';
import {router, useRouter} from 'expo-router';
import MyCamera from "@/app/(popups)/MyCamera";
import {CameraCapturedPicture} from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { imageDb } from "@/components/firebase";
import {ref, uploadBytes} from "@firebase/storage";

import Compressor from 'compressorjs';

export const AddClothes = () => {
    const [selectedValues, setSelectedValues] = useState<{
        category: string,
        condition: string,
        color: string,
        theme: string,
    }>({
            category: "Select",
            condition: "Select",
            color: "Select",
            theme: "Select",
        });
    const [showModal, setShowModal] = useState(false);
    const [currentOption, setCurrentOption] = useState<string>('');
    const [text, onChangeText] = useState('Description');
    const [takingPicture, setTakingPicture] = useState(false);
    const [picture, setPicture] = useState("https://cdn.builder.io/api/v1/image/assets/TEMP/4b2fb31d9fd7f8776037917f534beb06505f89264458be53b4aec15764c79304")
    const [photo, setPhoto] = useState("");
    const router = useRouter();

    const optionRows: any[] = [
        {
            label: 'Category',
            options: [
                { label: 'Select', value: 'category' },
                { label: 'Tops', value: 'tops' },
                { label: 'Bottoms', value: 'bottoms' },
            ],
        },
        {
            label: 'Condition',
            options: [
                { label: 'Select', value: 'condition' },
                { label: 'New', value: 'new' },
                { label: 'Used', value: 'used' },
            ],
        },
        {
            label: 'Color',
            options: [
                { label: 'Select', value: 'color' },
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
            ],
        },
        {
            label: 'Theme',
            options: [
                { label: 'Select', value: 'theme' },
                { label: 'Casual', value: 'casual' },
                { label: 'Formal', value: 'formal' },
            ],
        },
    ];

    async function uploadImage(fileName:string) {
        console.log(fileName)
        try {
            const storageRef = ref(imageDb, 'images/' + fileName);  // Define the storage reference path
            // Upload the file to Firebase Storage
            const response = await fetch(picture);
            const blob = await response.blob();
            const uploadTask = await uploadBytes(storageRef, blob);
            console.log(uploadTask.ref.fullPath)
            return uploadTask.ref.fullPath;
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const handleAddToWardrobe = async () => {
        const imageUrl = await uploadImage(Date.now()+"_image.jpg");
        const user = await AsyncStorage.getItem("user-id");
        const requestBody = {
            category: selectedValues.category,
            condition: selectedValues.condition,
            description: text,
            size: "S",
            title: "denim jacket",
            rental_price: 0,
            purchase_price: 0,
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

            const data = await response.json();  // Wait for the response to be parsed
            console.log(data);
            router.replace("/profile");
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };


    const handleOptionSelection = (selected: {
        category: string,
            condition: string,
            color: string,
            theme: string,
    }) => {
        setSelectedValues(selected);
        setShowModal(false);
    };

    const handleTakenPicture = (photo: CameraCapturedPicture) => {
        setPicture(photo.uri);
        if (photo.base64 != undefined && photo.base64 !== "") {
            setPhoto(photo.base64);
        }
        setTakingPicture(false);
    };

    if (takingPicture) {
        return <MyCamera handleTakenPicture={handleTakenPicture}/>
    }

    return (
        <View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => router.replace('/profile')}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/76dc4b34dc0f148da5ee5b240ca6b1b833f1819a8fa1b0875c62c63d82654ad2' }}
                        style={styles.backButton}
                        accessibilityLabel="backButton"
                    />
                </TouchableWithoutFeedback>

                <View style={styles.imageUploadArea}>
                    <TouchableOpacity style={styles.cameraIcon} onPress={() => setTakingPicture(true)}>
                        <Image
                            source={{ uri: picture }}
                            style={styles.cameraIcon}
                            accessibilityLabel="center icon"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.previewArea} >
                    <TextInput
                        style={styles.description}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Description"
                        placeholderTextColor="#888" // Optional: Custom placeholder color
                        maxLength={200} // Optional: Limit input length
                        multiline={true} // Optional: Allow multiline input
                    />
                </View>
                <View style={styles.separator} />

                <View style={styles.optionsContainer}>
                    <OptionRow handleOptionSelect={handleOptionSelection}/>
                </View>

                <View style={styles.separator} />

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddToWardrobe}
                        accessibilityRole="button"
                        accessibilityLabel="Add to Wardrobe"
                    >
                        <Text style={styles.addButtonText}>Add to Wardrobe</Text>
                    </TouchableOpacity>
                </View>


                {/* Modal for selecting options */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            {optionRows
                                .find((row) => row.label === currentOption)
                                ?.options.map((option: any) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={styles.modalButton}
                                        onPress={() => handleOptionSelection(option.value)}
                                    >
                                        <Text style={styles.modalButtonText}>{option.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            <Button title="Close" onPress={() => setShowModal(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        display: 'flex',
        maxWidth: 480,
        width: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
        fontSize: 24,
        justifyContent: 'flex-start',
        margin: 0,
        padding: 5,
    },
    backButton: {
        aspectRatio: 1,
        objectFit: 'contain',
        width: 55,
        position: 'absolute',
        zIndex: 1,
        left: 15,
        top: 30,
    },
    imageUploadArea: {
        display: 'flex',
        height: 300,
        marginTop: 39,
        width: 300,
        maxWidth: '100%',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#828282',
    },
    previewArea: {
        borderRadius: 5,
        display: 'flex',
        minHeight: 96,
        marginTop: 39,
        width: 344,
        maxWidth: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#828282',
    },
    separator: {
        backgroundColor: '#d9d9d9',
        display: 'flex',
        minHeight: 10,
        marginTop: 39,
        width: '100%',
    },
    optionsContainer: {
        display: 'flex',
        marginTop: 39,
        width: 348,
        maxWidth: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: 20,
        color: '#000',
    },
    actionContainer: {
        display: 'flex',
        marginTop: 39,
        width: 285,
        maxWidth: '100%',
    },
    addButton: {
        borderRadius: 5,
        backgroundColor: '#132260',
        padding: 16,
        width: '100%',
    },
    addButtonText: {
        color: '#fff',
        fontFamily: 'Gantari, sans-serif',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
    },
    cameraIcon: {
        aspectRatio: 1,
        objectFit: 'cover',
        width: "100%",
        height: "100%",
    },
    description: {
        color: '#828282',
        fontFamily: 'Gantari, sans-serif',
        fontWeight: '700',
        fontSize: 18,
        alignSelf: "flex-start"
    },

    // Modal styles
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtonText: {
        fontSize: 18,
        color: '#000',
    },
});

export default AddClothes;
