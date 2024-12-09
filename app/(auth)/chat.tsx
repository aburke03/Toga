import {Keyboard, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import { CartIcon } from './../cart';
import Purchasing from "@/components/Purchasing";
import Selling from "@/components/Selling";

const Chat = () => {
    const [content, setContent] = useState<React.ReactNode>(null);
    const [currState, setCurrState] = useState("purchasing");

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

    useEffect(() => {
        if (currState === 'purchasing') {
            setContent(<Purchasing key={Date.now()} />);
        }
    }, [currState]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <CartIcon />
                <View style={styles.topNav}>
                    <Pressable 
                        style={currState === "purchasing" ? styles.topNavButtonSelected : styles.topNavButton} 
                        onPress={() => changeContent("purchasing")}
                    >
                        <Text style={styles.topNavButtonText}>Purchasing</Text>
                    </Pressable>
                    <Pressable 
                        style={currState === "selling" ? styles.topNavButtonSelected : styles.topNavButton} 
                        onPress={() => changeContent("selling")}
                    >
                        <Text style={styles.topNavButtonText}>Selling</Text>
                    </Pressable>
                </View>
                {content}
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
        borderColor: '#6c47ff',
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
        paddingTop: 50,
        padding: 0,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#828282',
        flex: 1,
    },
    topNavButtonSelected: {
        paddingTop: 50,
        padding: 0,
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderColor: '#000000',
        flex: 1,
    },
    topNavButtonText: {
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
    }
});

export default Chat;