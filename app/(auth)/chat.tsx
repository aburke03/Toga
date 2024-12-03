import {Keyboard, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import { CartIcon } from './../cart';
import Purchasing from "@/components/Purchasing";
import Selling from "@/components/Selling";

const Chat = () => {
    const [content, setContent] = useState<React.ReactNode>(null);
    const [currState, setCurrState] = useState("purchasing");

    // Add useEffect for initial content
    useEffect(() => {
        setContent(<Purchasing key={Date.now()} />);
    }, []);

    function changeContent(route: string) {
        setCurrState(route);
        switch (route) {
            case 'purchasing':
                setContent(<Purchasing key={Date.now()} />);
                break;
            case 'selling':
                setContent(<Selling />);
                break;
        }
    }

    // Force refresh when component mounts or updates
    useEffect(() => {
        if (currState === 'purchasing') {
            setContent(<Purchasing key={Date.now()} />);
        }
    }, [currState]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.topNav}>
                    <Pressable 
                        style={currState === "purchasing" ? styles.topNavButtonSelected : styles.topNavButton} 
                        onPress={() => changeContent("purchasing")}
                    >
                        <Text style={currState === "purchasing" ? styles.topNavButtonTextSelected : styles.topNavButtonText}>Purchasing</Text>
                    </Pressable>
                    <Pressable 
                        style={currState === "selling" ? styles.topNavButtonSelected : styles.topNavButton} 
                        onPress={() => changeContent("selling")}
                    >
                        <Text style={currState === "selling" ? styles.topNavButtonTextSelected : styles.topNavButtonText}>Selling</Text>
                    </Pressable>
                </View>
                <View style={styles.cartButton}>
                <CartIcon />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: '#92Caff',
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    topNav: {
        flexDirection: 'row',
        width: '100%',
        padding: 0,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    topNavButton: {
        paddingTop: '30%',
        padding: 0,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        flex: 1,
    },
    topNavButtonSelected: {
        paddingTop: "30%",
        padding: 0,
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderColor: '#92CAFF',
        flex: 1,
    },
    topNavButtonText: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10,
        color: '#666',
    },
    topNavButtonTextSelected: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10,
        color: '#92CAFF',

    },
    cartButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#92CAFF',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
    },
});

export default Chat;