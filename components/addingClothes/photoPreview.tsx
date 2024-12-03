import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react'
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View, Text } from 'react-native';
import {router} from "expo-router";

const photoPreview = ({
                          photo,
                          handleRetakePhoto,
                          handleUsePhoto,
                      }: {
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
    handleUsePhoto: (photo: CameraCapturedPicture) => void;
}) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
                style={styles.previewContainer}
                source={{ uri: 'data:image/jpg;base64,' + photo.base64}}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <Fontisto name="trash" size={36} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleUsePhoto(photo)}>
                <Text style={styles.text}>Use This Photo</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 15,
        padding: 1,
        width: '95%',
        justifyContent: 'center',
        alignItems: "center",
    },
    previewContainer: {
        width: '95%',
        height: "65%",
        borderRadius: 15
    },
    buttonContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: "center",
        width: '100%',
    },
    button: {
        backgroundColor: '#92CAFF',
        borderRadius: 2,
        marginRight: '5%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 18,
    },

});

export default photoPreview;