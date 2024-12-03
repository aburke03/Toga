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
    Button, Keyboard,
} from 'react-native';
import { OptionRow } from '@/components/addingClothes/OptionRow';
import {router, Stack, useRouter} from 'expo-router';
import MyCamera from "@/app/(popups)/MyCamera";
import {CameraCapturedPicture} from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { imageDb } from "@/components/firebase";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile, removeBackgroundFromImageUrl} from "remove.bg";

import Compressor from 'compressorjs';
import {Ionicons} from "@expo/vector-icons";
import {NumberInput, TextField} from "react-native-ui-lib";

export const AddClothes = () => {
    const [selectedValues, setSelectedValues] = useState<{
        category: string,
        condition: string,
        color: string,
        size: string,
    }>({
            category: "Select",
            condition: "Select",
            color: "Select",
            size: "Select",
        });
    const [name, setName] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [currentOption, setCurrentOption] = useState<string>('');
    const [description, setDescription] = useState('');
    const [takingPicture, setTakingPicture] = useState(false);
    const [picture, setPicture] = useState("https://cdn.builder.io/api/v1/image/assets/TEMP/4b2fb31d9fd7f8776037917f534beb06505f89264458be53b4aec15764c79304")
    const [photo, setPhoto] = useState("");
    const [price, setPrice] = useState(0);
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
            label: 'Size',
            options: [
                { label: 'Select', value: 'size' },
                { label: 'Casual', value: 'casual' },
                { label: 'Formal', value: 'formal' },
            ],
        },
    ];

    async function uploadImage(fileName: string) {
        console.log(fileName)
        try {
            const storageRef = ref(imageDb, 'images/' + fileName);  // Define the storage reference path
            // Upload the file to Firebase Storage
            const response = await fetch(picture);
            const blob = await response.blob();
            const uploadTask = await uploadBytes(storageRef, blob);
            console.log(uploadTask.ref.fullPath)
            const apiKey = '6QmVc1MeSWvEagaBLyy5Ufq9'; // Replace with your API key

            const formData = new FormData();
            const downloadUrl = await getDownloadURL(storageRef)
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
                const storageRef2 = ref(imageDb, 'images/transparent' + fileName);
                const blob2 = await response.blob();
                const uploadTask2 = await uploadBytes(storageRef2, blob2);
                return uploadTask2.ref.fullPath;
            } catch (error) {
                console.error('Error uploading file:', error);
            }
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
            description: description,
            size: selectedValues.size,
            title: name,
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
            size: string,
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
            <Stack.Screen
                options={{
                    title: "Toga",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.replace("/profile")}
                            style={styles.headerButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={styles.container}>

                <View style={styles.imageUploadArea}>
                    <TouchableOpacity style={styles.cameraIcon} onPress={() => setTakingPicture(true)}>
                        <Image
                            source={{ uri: picture }}
                            style={styles.cameraIcon}
                            accessibilityLabel="center icon"
                        />
                    </TouchableOpacity>
                </View>
                    <TextField
                        placeholder={'Item Name'}
                        floatingPlaceholder
                        onChangeText={text => setName(text)}
                        showCharCounter
                        maxLength={30}
                        style={styles.name}
                        floatingPlaceholderStyle={styles.floatingPlaceholder}
                        containerStyle={styles.floatingContainer}
                    />
                    <TextField
                        placeholder={'Description'}
                        floatingPlaceholder
                        onChangeText={text => setDescription(text)}
                        showCharCounter
                        maxLength={80}
                        style={styles.name}
                        floatingPlaceholderStyle={styles.floatingPlaceholder}
                        containerStyle={styles.floatingContainer}
                    />
                <NumberInput fractionDigits={2} textFieldProps={{style: styles.trailingText}} leadingTextStyle={styles.leadingText} containerStyle={styles.price} initialNumber={0} onChangeNumber={(value) => setPrice(parseFloat(value.userInput))} leadingText={'Sell Price'}/>


                <View style={styles.optionsContainer}>
                    <OptionRow handleOptionSelect={handleOptionSelection}/>
                </View>

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
        width: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
        fontSize: 24,
        justifyContent: 'flex-start',
        margin: 0,
        padding: 5,
    },
    trailingText: {
        fontSize: 18,
        paddingHorizontal: "40%",
        fontWeight: 'bold',
    },
    price: {
        marginTop: 15,
        marginBottom: -40,
        width: "112%",
        justifyContent: 'space-between',
        left: "15%"
    },
    leadingText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    floatingPlaceholder: {
        fontSize: 18
    },
    floatingContainer: {
        width: "80%",
        height: "20%",
        marginTop: 20,
        marginBottom: -80
    },
    name: {
        fontSize: 24
    },
    backButton: {
        aspectRatio: 1,
        objectFit: 'contain',
        width: 55,
        position: 'absolute',
        left: 15,
        top: 30,
    },
    imageUploadArea: {
        display: 'flex',
        height: '25%',
        marginTop: '10%',
        width: 'auto',
        maxWidth: '100%',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#828282',
    },
    headerButton: {
        paddingHorizontal: 8,
    },
    previewArea: {
        borderRadius: 5,
        display: 'flex',
        minHeight: 96,
        width: 344,
        maxWidth: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#828282',
        top: -50
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
        width: 285,
        maxWidth: '100%',
    },
    addButton: {
        borderRadius: 5,
        backgroundColor: '#132260',
        padding: 8,
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
    cameraPic: {

        aspectRatio: 1,
        objectFit: 'fill',
        width: "101%",
        height: "auto",
        justifyContent:'center',
        alignSelf: 'center',

    },


});

export default AddClothes;
