import React, {useState} from "react";
import {Text, Pressable, ScrollView, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";


export default function FilterBar(props: any) {

    const buttons = ["Tops", "Bottoms", "Shoes", "Hats", "Accessories"];
    const [activeButtons, setActiveButtons] = useState(initActiveButtons);

    function initActiveButtons() {
        let arr: boolean[] = []
        for (let button of buttons) {
            arr.push(false);
        }
        return arr;
    }

    function filterButtonPress() {
        console.log("Filter Bar Press");
    }

    function quickFilterPress(index: number) {
        let newArr: boolean[] = activeButtons;
        newArr[index] = !activeButtons[index];
        setActiveButtons(newArr);
        console.log(activeButtons);
        console.log("Quick Filter Bar Press");
    }

    return (
        <ScrollView horizontal={true} style={styles.bar} showsHorizontalScrollIndicator={false}>
            <Ionicons name={"filter"} onPress={filterButtonPress} size={24} style={styles.filter} />
            {buttons.map((button, index) => (
                <Pressable style={styles.button} key={index} onPress={() => quickFilterPress(index)}>
                    <Text style={activeButtons[index] ? styles.selected : styles.unselected}>{button}</Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    filter: {
        backgroundColor: "#92CAFF",
        marginHorizontal: 8,
        padding: 5,
        borderRadius: 5,
    },
    button: {

    },
    selected: {
        color: "white",
        height: "100%",
        lineHeight: 32,
        backgroundColor: "#132260",
        fontSize: 16,
        width: 100,
        textAlign: "center",
        borderRadius: 5,
        marginHorizontal: 8,
    },
    unselected: {
        height: "100%",
        lineHeight: 32,
        backgroundColor: "#92CAFF",
        fontSize: 16,
        width: 100,
        textAlign: "center",
        borderRadius: 5,
        marginHorizontal: 8,
    }
});