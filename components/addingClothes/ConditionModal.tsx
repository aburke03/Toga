import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ConditionModal: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
    selectedOption: string | null;
}> = ({ isVisible, onClose, onSelect, selectedOption }) => {
    const options = ['New', 'Like New', 'Used-Excellent', 'Used-Great', 'Used-Fair'];

    const handleSelect = (option: string) => {
        onSelect(option);
        onClose();
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Condition</Text>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionContainer}
                            onPress={() => handleSelect(option)}
                        >
                            <View
                                style={[
                                    styles.radioCircle,
                                    selectedOption === option && styles.radioSelected, // Highlight the selected option
                                ]}
                            />
                            <Text style={styles.radioText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
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
        height: '40%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#555',
        marginRight: 10,
    },
    radioSelected: {
        backgroundColor: '#555',
    },
    radioText: {
        fontSize: 16,
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
