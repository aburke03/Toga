import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import { type ImageSource } from "expo-image";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import React from 'react';

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
};

export default function TryOnImage({ imageSize, stickerSource }: Props) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const drag = Gesture.Pan().onChange(event => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    }).onEnd(event => {
        if ((Math.abs(event.absoluteX - 320) < 100 && Math.abs(event.absoluteY - 683) < 100)) {
            translateX.value = -1000;
        }
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });


    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle]}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={{ width: imageSize, height: imageSize }}
                    />
            </Animated.View>
        </GestureDetector>
    );
}
