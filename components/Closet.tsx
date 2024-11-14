import React, {useState} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import { useUser } from '@clerk/clerk-expo';

const Closet = () => {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);

    const onSaveUser = async () => {
        try {
            // Update the user's first and last name (Needs further testing)
            const result = await user?.update({
                firstName: firstName!,
                lastName: lastName!,
            });
            console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
        } catch (e) {
            console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
        }
    };

    return (
        <View>
            <Text style={{ textAlign: 'center' }}>
                Good morning {user?.firstName} {user?.lastName}!
            </Text>
            <TextInput
                placeholder="First Name"
                value={firstName || ''}
                onChangeText={setFirstName}
                style={styles.inputField}
                placeholderTextColor={'grey'}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName || ''}
                onChangeText={setLastName}
                style={styles.inputField}
                placeholderTextColor={'grey'}
            />
            <Button onPress={onSaveUser} title="Update account" color={'#6c47ff'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: '#6c47ff',
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    topNav: {
        flexDirection: 'row',
    },
    topNavButton: {

    },
    topNavButtonText: {
        fontSize: 18,
    }
});

export default Closet;