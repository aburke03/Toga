import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react'
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View, Text } from 'react-native';

const handleReturn = () => {
    alert('go back');
}

const photoPreview = ({
                          photo,
                          handleRetakePhoto,
                      }: {
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
}) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
                style={styles.previewContainer}
                source={{uri: 'data:image/jpg;base64,' + photo.base64}}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <Fontisto name='trash' size={36} color='white' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReturn}>
                <Text style={styles.text}>Use This Photo</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 5,
        padding: 0,
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: "center",
    },
    previewContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
    },
    buttonContainer: {
        borderTopWidth: 3,
        borderTopColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingVertical: 15,
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default photoPreview;
