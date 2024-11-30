import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Pressable, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import Closet from "@/components/Closet";
import TryOn from "@/components/TryOn";
import Bookmarked from "@/components/Bookmarked";
import Camera from "@/components/Camera";
import {Button} from "react-native-ui-lib";
import {useFocusEffect} from "expo-router";

const Profile = () => {
  const [content, setContent] = useState(<Closet />)
  const [currState, setCurrState] = useState("closet")

  useFocusEffect(
      useCallback(() => {
        setContent(<Closet />);
        setCurrState("closet");

        // Return function is invoked whenever the route gets out of focus.
        return () => {
          console.log('This route is now unfocused.');
        };
      }, [])
  );

  function changeContent(route: string) {
    setCurrState(route);
    switch (route) {
      case 'closet':
        setContent(<Closet />);
        break;
      case 'bookmarked':
        setContent(<Bookmarked />);
        break;
      case 'tryOn':
        setContent(<TryOn />);
        break;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topNav}>
          <Pressable style={currState === "closet" ? styles.topNavButtonSelected : styles.topNavButton} onPress={() => changeContent("closet")}>
            <Text style={styles.topNavButtonText}>Your Closet</Text>
          </Pressable>
          <Pressable style={currState === "bookmarked" ? styles.topNavButtonSelected : styles.topNavButton} onPress={() => changeContent("bookmarked")}>
            <Text style={styles.topNavButtonText}>Bookmarked</Text>
          </Pressable>
          <Pressable style={currState === "tryOn" ? styles.topNavButtonSelected : styles.topNavButton} onPress={() => changeContent("tryOn")}>
            <Text style={styles.topNavButtonText}>Virtual Try-On</Text>
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
  },
  addButton: {
    position: "absolute",
    top: "100%",
    verticalAlign: "bottom"
  },
});

export default Profile;
