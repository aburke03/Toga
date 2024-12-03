import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "react-native-ui-lib";
import React, {useState} from "react";
export const FilterBar = (props: any) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryScrollContent}
        >
            {['All', 'Tops', 'Bottoms', 'Shoes'].map((category) => (
                <TouchableOpacity
                    key={category}
                    style={[
                        styles.categoryButton,
                        selectedCategory === category && styles.categoryButtonActive
                    ]}
                    onPress={() => setSelectedCategory(category)}
                >
                    <Text style={[
                        styles.categoryText,
                        selectedCategory === category && styles.categoryTextActive
                    ]}>
                        {category}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    categoryScroll: {
        marginBottom: 8,
    },
    categoryScrollContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    categoryButtonActive: {
        backgroundColor: '#92CAFF',
    },
    categoryText: {
        color: '#666666',
        fontWeight: '600',
        fontSize: 15,
    },
    categoryTextActive: {
        color: '#ffffff',
    },
});