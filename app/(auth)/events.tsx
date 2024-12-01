import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import EventPreview from "@/components/EventPreview";

const Events = () => {
       return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>

        <EventPreview/>
            <EventPreview/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        padding: 20,
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
});

export default Events;
