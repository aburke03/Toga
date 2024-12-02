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
                <Fontisto name="trash" size={36} color="white" />
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
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 0,
        padding: 1,
        width: '95%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: "center",
    },
    previewContainer: {
        width: '90%',
        height: '85%',
        borderRadius: 0
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopColor:'white',
        borderTopWidth: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    text:{
        fontSize: 18,
        color: "white",
    },

});

export default photoPreview;