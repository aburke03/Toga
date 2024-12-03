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
        <View style={styles.topContainer}>
            <TouchableOpacity style={styles.buttonTrash} onPress={handleRetakePhoto}>
                <Fontisto name="trash" size={36} color="white" />
            </TouchableOpacity>
        </View>
        <View style={styles.box}>
            <Image
                style={styles.previewContainer}
                source={{ uri: 'data:image/jpg;base64,' + photo.base64}}
            />
        </View>

        <View style={styles.buttonContainer}>

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
        justifyContent: 'flex-start',
    },

    box: {
        top: '10%',
        width: '100%',
        height: '55%',
        justifyContent: 'center',
        alignItems: "center",
        zIndex: 1,
    },
    previewContainer: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

        top: '-4%',
        width: '100%',
        height: '100%',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '42%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 30,
        backgroundColor: '#92CAFF',
        bottom: '-10%',

    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    topContainer: {
        top: 0,
        position: 'absolute',
        height: '8%',
        backgroundColor: '#92CAFF',
        width: '100%',
    }, buttonTrash: {
        alignItems: 'flex-end',
        marginRight: '10%',

    }


});

export default photoPreview;