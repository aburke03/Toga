import { AntDesign } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhotoPreview from "@/components/addingClothes/photoPreview";


export default function MyCamera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photo, setPhoto] = useState<any>(null);

    const handleRetakePhoto = () => setPhoto(null);

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
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <AntDesign name="retweet" size={44} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <AntDesign name="camera" size={44} color="black" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});