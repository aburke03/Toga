import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SelectOptionProps } from '../WardrobeTypes';

export const SelectOption: React.FC<SelectOptionProps> = ({
                                                              label,
                                                              value,
                                                              onSelect,
                                                              ariaLabel
                                                          }) => {
    return (
        <View style={styles.selectWrapper}>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => onSelect(value)}
                accessibilityRole="button"
                accessibilityLabel={ariaLabel || `Select ${label}`}
                accessibilityHint={`Opens ${label} selection menu`}
            >
                <Text style={styles.selectButtonText}>{label}</Text>
                <Text style={styles.selectArrow}>&gt;</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    selectWrapper: {
        display: 'flex',
        gap: 10,
    },
    selectButton: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'transparent',
        padding: 0,
    },
    selectButtonText: {
        fontFamily: 'Gantari, sans-serif',
        fontSize: 20,
        fontWeight: '400',
    },
    selectArrow: {
        fontFamily: 'Gentium Book Basic, -apple-system, Roboto, Helvetica, sans-serif',
    },
});