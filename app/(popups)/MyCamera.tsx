import { AntDesign } from '@expo/vector-icons';
import {CameraView, useCameraPermissions, CameraType, CameraCapturedPicture} from 'expo-camera';
import { useRef, useState } from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PhotoPreview from "@/components/addingClothes/photoPreview";
import React from 'react';


const MyCamera = ({handleTakenPicture}: {handleTakenPicture: (photo: CameraCapturedPicture) => void}) => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [photo, setPhoto] = useState<any>(null);

    const handleRetakePhoto = () => setPhoto(null);

    const handleUsePhoto = (photo: CameraCapturedPicture) => {
        handleTakenPicture(photo);
    }

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
            <View style={styles.topContainer}>

                <TouchableOpacity style={styles.buttonSwap} onPress={toggleCameraFacing}>
                    <AntDesign name="retweet" size={44} color="#92CAFF" />
                </TouchableOpacity>

            </View>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} pictureSize={'10%'}>
                <View style={styles.dashedBox} />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonBorder}>
                    <View style={styles.blackButton}>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <AntDesign name="camera" size={44} color="#92CAFF" />
                    </TouchableOpacity>
                        </View>
                </View>
                </View>
                <View style={styles.background}></View>
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
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '22%',

    },
    button: {
        padding: 10,
        color: 'white',
        backgroundColor: '#92CAFF',
        borderRadius: 100,
        top: '0%',
        zIndex:1000,

    },
    blackButton: {
        padding: 2,
        color: 'white',
        backgroundColor: 'black',
        borderRadius: 100,
        top: '0%',

    },
    buttonBorder: {
        padding: 4,
        color: 'white',
        backgroundColor: '#92CAFF',
        borderRadius: 100,
        top: '-50%',
        zIndex:1,
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
    },
    topContainer: {
        height: '8%',
        backgroundColor: 'white',

    },
    buttonSwap: {
        alignItems: 'flex-end',
        marginRight: '10%',
        marginTop: '2%',
    },
    background: {
        /*
        backgroundColor: '#92CAFF',
        height: '20%',
        position: 'absolute',
        bottom: '22%',
        width: '100%',
        opacity: .9,
        */
    }


});