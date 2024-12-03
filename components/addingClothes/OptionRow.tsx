import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CategoryModal } from './CategoryModal';
import { ConditionModal } from './ConditionModal';
import { ColorModal } from './ColorModal';
import { ThemeModal } from './SizeModal';
import {CameraCapturedPicture} from "expo-camera";

export const OptionRow = ({handleOptionSelect}: {handleOptionSelect: (selected: {
        category: string,
        condition: string,
        color: string,
        size: string,
    }) => void}) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState({
        category: 'Select',
        condition: 'Select',
        color: 'Select',
        size: 'Select',
    });

    const openModal = (type: string) => {
        setActiveModal(type);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const handleOptionChange = (type: string, value: string) => {
        setSelectedOptions((prev) => ({ ...prev, [type]: value }));
        handleOptionSelect(selectedOptions);
        closeModal(); // Close the modal after selection
    };

    return (
        <View style={styles.optionRow}>
            {/** Category Row */}
            <TouchableOpacity onPress={() => openModal('category')} style={styles.row}>
                <Text style={styles.optionLabel}>Category</Text>
                <Text style={styles.optionValue}>{selectedOptions.category}</Text>
            </TouchableOpacity>
            {/** Condition Row */}
            <TouchableOpacity onPress={() => openModal('condition')} style={styles.row}>
                <Text style={styles.optionLabel}>Condition</Text>
                <Text style={styles.optionValue}>{selectedOptions.condition}</Text>
            </TouchableOpacity>
            {/** Color Row */}
            <TouchableOpacity onPress={() => openModal('color')} style={styles.row}>
                <Text style={styles.optionLabel}>Color</Text>
                <Text style={styles.optionValue}>{selectedOptions.color}</Text>
            </TouchableOpacity>
            {/** Size Row */}
            <TouchableOpacity onPress={() => openModal('size')} style={styles.row}>
                <Text style={styles.optionLabel}>Size</Text>
                <Text style={styles.optionValue}>{selectedOptions.size}</Text>
            </TouchableOpacity>

            {/** Modals */}
            <CategoryModal
                isVisible={activeModal === 'category'}
                onClose={closeModal}
                onSelect={(value:string) => handleOptionChange('category', value)}
                selectedOption={selectedOptions.condition}

            />
            <ConditionModal
                isVisible={activeModal === 'condition'}
                onClose={closeModal}
                onSelect={(value) => handleOptionChange('condition', value)}
                selectedOption={selectedOptions.condition} // Pass selected value
            />
            <ColorModal
                isVisible={activeModal === 'color'}
                onClose={closeModal}
                onSelect={(value:string) => handleOptionChange('color', value)}
                selectedOption={selectedOptions.condition}

            />
            <ThemeModal
                isVisible={activeModal === 'size'}
                onClose={closeModal}
                onSelect={(value:string) => handleOptionChange('size', value)}
                selectedOption={selectedOptions.condition}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    optionRow: {
        display: 'flex',
        width: '100%',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionValue: {
        fontSize: 16,
        color: '#555',
    },
});
