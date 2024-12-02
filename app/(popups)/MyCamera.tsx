import React, { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhotoPreview from "@/components/addingClothes/photoPreview";

export default function MyCamera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photo, setPhoto] = useState<any>(null);

    const handleRetakePhoto = () => setPhoto(null);

    const handleReturn = () => {
        alert('Send back picture and go to add clothes');
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 1,
                base64: true,
                exif: true,
            };
            const takenPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(takenPhoto);
        }
    };

    if (photo) {
        return <PhotoPreview photo={photo} handleRetakePhoto={handleRetakePhoto} />;
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.barButton} onPress={toggleCameraFacing}>
                    <AntDesign name="retweet" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.barButton} onPress={handleTakePhoto}>
                    <AntDesign name="camera" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    bottomBar: {
        borderTopWidth: 3,
        borderTopColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 15,
    },
    barButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});
