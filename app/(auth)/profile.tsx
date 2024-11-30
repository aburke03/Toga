import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Button,
  TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import {Modal} from 'react-native';
import Closet from "@/components/Closet";
import TryOn from "@/components/TryOn";
import Bookmarked from "@/components/Bookmarked";
import myCamera from "@/components/addingClothes/MyCamera";
import {navigate} from "expo-router/build/global-state/routing";
import {CaptchaElement} from "@clerk/clerk-js/dist/types/ui/elements/CaptchaElement";
import AddClothes from "@/components/addingClothes/addClothesPage";

const Profile = () => {
  const [content, setContent] = useState(<Closet />)
  const [currState, setCurrState] = useState("closet")


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

  const [addClothesPopup, setAddClothesPopup] = useState(false);

  const openPopup = () => {
    setAddClothesPopup(true);
  }

  const closePopup = () => {
    setAddClothesPopup(false);
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
        <TouchableOpacity style={styles.addButton} onPress={openPopup}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={false}
            visible={addClothesPopup}
            onRequestClose={closePopup}>
          <View style={styles.modalContainer}>
            <AddClothes></AddClothes>
            <TouchableOpacity onPress={closePopup} >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',

  },
  modalText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex:10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },

  addButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,

  },


});


export default Profile;
