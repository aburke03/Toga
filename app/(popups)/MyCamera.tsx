import { AntDesign } from '@expo/vector-icons';
import {CameraView, useCameraPermissions, CameraType, CameraCapturedPicture} from 'expo-camera';
import { useRef, useState } from 'react';
import {Button, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PhotoPreview from "@/components/addingClothes/photoPreview";
import React from 'react';


const MyCamera = ({handleTakenPicture}: {handleTakenPicture: (photo: CameraCapturedPicture) => void}) => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photo, setPhoto] = useState<any>(null);

    const targetPixels = 500;

    const handleRetakePhoto = () => setPhoto(null);

    const handleUsePhoto = (photo: CameraCapturedPicture) => {
        handleTakenPicture(photo);
    }

    const handleReturn = () => {alert('send back pic and got to add clothes')};

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

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 1,
                base64: true,
                exif: true,
                height: 500,
                width: 500
            };
            const takenPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(takenPhoto);
        }
    };

    if (photo) {
        return <PhotoPreview photo={photo} handleRetakePhoto={handleRetakePhoto}  handleUsePhoto={handleUsePhoto}/>;
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} pictureSize={'10%'}>
                <View style={styles.dashedBox} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <AntDesign name="retweet" size={44} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <AntDesign name="camera" size={44} color="white" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}
export default MyCamera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: "50%"
    },
    camera: {
        flex: 1,
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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    dashedBox: {
        position: "absolute",
        borderStyle: "dashed",
        height: 500,
        width: 500,
    }
});