import {Image} from 'react-native';
import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Pressable} from 'react-native';
import React, {useCallback, useState} from 'react';
import Closet from "@/components/Closet";
import TryOn from "@/components/TryOn";
import Bookmarked from "@/components/Bookmarked";
import {useFocusEffect} from "expo-router";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [content, setContent] = useState(<Closet />)
  const [currState, setCurrState] = useState("closet")

  const profileData = {
    username: "John Doe",
    group: "Alpha Delta Pi",
    rating: 4.8,
    sales: 10,
    disputes: 3
  };

  useFocusEffect(
    useCallback(() => {
      setContent(<Closet />);
      setCurrState("closet");
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

  async function logout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user-id");
    router.replace('/login');
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Pressable onPress={logout}>
            <Image 
              source={{ uri: 'https://placekitten.com/100/100' }}
              style={styles.avatar}
            />
            </Pressable>
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{profileData.username}</Text>
              <View style={styles.groupBadge}>
                <Text style={styles.groupText}>{profileData.group}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Sales</Text>
              <Text style={styles.statValue}>{profileData.sales}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Rating</Text>
              <Text style={styles.statValue}>{profileData.rating} / 5</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Disputes</Text>
              <Text style={styles.statValue}>{profileData.disputes}</Text>
            </View>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.topNav}>
          <Pressable 
            style={[
              styles.topNavButton,
              currState === "closet" && styles.topNavButtonSelected
            ]} 
            onPress={() => changeContent("closet")}
          >
            <Text style={[
              styles.topNavButtonText,
              currState === "closet" && styles.selectedText
            ]}>Your Closet</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.topNavButton,
              currState === "bookmarked" && styles.topNavButtonSelected
            ]} 
            onPress={() => changeContent("bookmarked")}
          >
            <Text style={[
              styles.topNavButtonText,
              currState === "bookmarked" && styles.selectedText
            ]}>Bookmarked</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.topNavButton,
              currState === "tryOn" && styles.topNavButtonSelected
            ]} 
            onPress={() => changeContent("tryOn")}
          >
            <Text style={[
              styles.topNavButtonText,
              currState === "tryOn" && styles.selectedText
            ]}>Try-On</Text>
          </Pressable>
        </View>

        <View style={styles.contentContainer}>
          {content}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#87CEEB',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  profileHeader: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  groupText: {
    color: '#1976D2',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  topNav: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  topNavButton: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  topNavButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#1976D2',
  },
  topNavButtonText: {
    fontSize: 16,
    color: '#666',
  },
  selectedText: {
    color: '#1976D2',
    fontWeight: '500',
  },
});

export default Profile;