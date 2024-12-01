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
import { useRouter } from 'expo-router';


export const AddClothes: React.FC = () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
    const [showModal, setShowModal] = useState(false);
    const [currentOption, setCurrentOption] = useState<string>('');
    const [text, onChangeText] = React.useState('Description');

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

    const handleAddToWardrobe = () => {
        console.log('Adding to wardrobe:', selectedValues);
    };

    const handleSelectOption = (label: string) => {
        setCurrentOption(label);
        setShowModal(true);
    };

    const handleOptionSelection = (value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [currentOption.toLowerCase()]: value,
        }));
        setShowModal(false);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => router.push("/home")}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/76dc4b34dc0f148da5ee5b240ca6b1b833f1819a8fa1b0875c62c63d82654ad2' }}
                        style={styles.backButton}
                        accessibilityLabel="backButton"
                    />
                </TouchableWithoutFeedback>

                <View style={styles.imageUploadArea} />
                <View style={styles.previewArea} />
                <View style={styles.separator} />

                <View style={styles.optionsContainer}>
                    <OptionRow />
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

                <TouchableOpacity style={styles.cameraIcon} onPress={() => router.replace("../MyCamera")}>
                    <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b2fb31d9fd7f8776037917f534beb06505f89264458be53b4aec15764c79304' }}
                        style={styles.cameraIcon}
                        accessibilityLabel="center icon"
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.description}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Description"
                    placeholderTextColor="#888" // Optional: Custom placeholder color
                    maxLength={200} // Optional: Limit input length
                    multiline={true} // Optional: Allow multiline input
                />

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
        </ScrollView>
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
        minHeight: 200,
        marginTop: 39,
        width: 200,
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
        objectFit: 'contain',
        width: 120,
        position: 'absolute',
        left: '50%',
        top: '22%',
        transform: [{ translateX: -60 }, { translateY: -60 }],
        height: 120,
    },
    description: {
        color: '#828282',
        fontFamily: 'Gantari, sans-serif',
        fontWeight: '700',
        fontSize: 18,
        position: 'absolute',
        left: 36,
        top: 300,
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
