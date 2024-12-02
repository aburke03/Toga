import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ColorModal: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
    selectedOption: string | null;
}> = ({ isVisible, onClose, onSelect, selectedOption }) => {
    const options = [
        { name: 'Red', color: 'red' },
        { name: 'Blue', color: 'blue' },
        { name: 'Green', color: 'green' },
        { name: 'Yellow', color: 'yellow' },
        { name: 'White', color: 'white' },
        { name: 'Black', color: 'black' },
        { name: 'Orange', color: 'orange' },
        { name: 'Purple', color: 'purple' },
        { name: 'Grey', color: 'grey' },
        { name: 'Pink', color: 'pink' },
    ];

    const handleSelect = (option: string) => {
        onSelect(option);
        onClose();
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Color</Text>
                    <View style={styles.optionGrid}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionContainer}
                                onPress={() => handleSelect(option.name)}
                            >
                                <View
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: option.color },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.radioText,
                                        selectedOption === option.name && styles.radioSelectedText,
                                    ]}
                                >
                                    {option.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '20%',
        alignSelf: 'center',
    },
    optionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 15,
    },
    colorCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    radioText: {
        fontSize: 16,
        color: '#000',
    },
    radioSelectedText: {
        fontWeight: 'bold',
        color: '#132260',
    },
    closeButton: {
        marginTop: '10%',
        padding: 10,
        backgroundColor: '#132260',
        borderRadius: 5,
        alignItems: 'center',

    },
    closeButtonText: {
        color: '#fff',
    },
});
