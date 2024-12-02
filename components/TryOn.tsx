import React, {useState} from "react";
import {FlatList, ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import {ColorPickerDialog, Incubator} from "react-native-ui-lib";
import ClothingCard from "@/components/ClothingCard";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import TryOnImage from "@/components/TryOnImage";
import {Ionicons} from "@expo/vector-icons";


const TryOn = () => {

    interface ClothingItem {
        priceAmount: number;
        buyType: string;
        bookmarked: boolean;
        image: string;
        size: string;
        key: number;
    }

    const images = require.context('../assets/images', true);

    const [clothes, setClothes] = useState<ClothingItem[]>([]);
    const [currentColor, setCurrentColor] = useState("#ffffff");
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [clothesPickerOpen, setClothesPickerOpen] = useState(false);

    const popupHeader: Incubator.DialogHeaderProps = {title: "", showDivider:true};

    const  cardPress = (item: ClothingItem) => {
        setClothes([...clothes, item]);
        setClothesPickerOpen(false)
    }

    let arr = [
        {priceAmount: 20, buyType: "Buy", bookmarked: true, image: images('./toga.png'), size: 'Large', key: 1},
        {priceAmount: 20, buyType: "Buy", bookmarked: true, image: images('./toga.png'), size: 'Large', key: 2},
        {priceAmount: 20, buyType: "Buy", bookmarked: true, image: images('./toga.png'), size: 'Large', key: 2},
        {priceAmount: 20, buyType: "Buy", bookmarked: true, image: images('./toga.png'), size: 'Large', key: 2},
        {priceAmount: 20, buyType: "Buy", bookmarked: true, image: images('./dressPNG.png'), size: 'Large', key: 2},
    ]

    const loadClothes = ({item}: {item: ClothingItem}) => {
        return (
            <ClothingCard key={item.key} image={item.image} bookmarked={item.bookmarked} buyType={"none"} priceAmount={item.priceAmount} size={item.size} cardPress={() => {cardPress(item)}} />
        );
    }

    function keyExtractor(item: any) {
        return item.key;
    }

    return (
        <View style={{backgroundColor: currentColor, height: "100%"}}>
            <GestureHandlerRootView>
                {clothes.map((item: any, index: number) => (
                    <TryOnImage key={index} imageSize={175} stickerSource={item.image} />
                ))}
            </GestureHandlerRootView>
            <Pressable style={styles.pressableColor} onPress={() => setColorPickerOpen(true)}>
                <ImageBackground resizeMode="cover" style={styles.image} source={require('../assets/images/Ellipse 6.png')} />
            </Pressable>
            <Pressable style={styles.pressableClothes} onPress={() => setClothesPickerOpen(true)}>
                <ImageBackground resizeMode="cover" style={styles.image} source={require('../assets/images/add 2.png')} />
            </Pressable>
            <Ionicons name="trash-sharp" size={48} color={"black"} style={styles.icon} />

            {colorPickerOpen ? <ColorPickerDialog
                visible={colorPickerOpen}
                initialColor={"#ffffff"}
                key={currentColor}
                onDismiss={() => setColorPickerOpen(false)}
                onSubmit={(value) => setCurrentColor(value)}
            /> : <></>}
            <Incubator.Dialog
                visible={clothesPickerOpen}
                onDismiss={() => setClothesPickerOpen(false)}
                bottom={true}
                useSafeArea
                containerStyle={{width:'100%', bottom: -55}}
                headerProps={popupHeader}
            >
                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.verticalScroll}
                    data={arr}
                    renderItem={loadClothes}
                    keyExtractor={keyExtractor}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </Incubator.Dialog>
        </View>
    );
};


export default TryOn;

const styles= StyleSheet.create({
    image: {
        height: 48,
        width: 48
    },
    text: {

    },
    pressableColor: {
        position: "absolute",
        right: 24,
        top: 28
    },
    columnWrapper: {
        width: "100%",
    },
    pressableClothes: {
        position: "absolute",
        right: 24,
        top: 96
    },
    verticalScroll: {
        bottom: 0
    },
    draggable: {
        width: 150,
        height: 150
    },
    icon: {
        position: "absolute",
        right: 24,
        bottom: 150
    }
})