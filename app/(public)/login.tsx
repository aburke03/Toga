import {Link, router} from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'; // Import Image component
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from "react-native-loading-spinner-overlay";

const Login = () => {

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  async function signIn(userInfo: {email: string, password: string}) {
    try {
      const response = await fetch("https://backend-toga-r5s3.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })


      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      } else {

        const data = await response.json();
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user-id', data.user.id);
        router.push('/home');
      }
    }catch (error) {
      console.error(error);
    } finally {
    }
  }

  const onSignInPress = async () => {
    setLoading(true);
    try {
      await signIn({
        email: emailAddress,
        password: password,
      });

    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Spinner visible={loading} />

        {/* Placeholder image on login screen */}
        <Image 
          source={require('../../assets/images/toga.png')}  
          style={styles.image} 
          resizeMode="contain" 
        />
        <TextInput
          autoCapitalize="none"
          placeholder="geauxtigers@lsu.edu"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
          placeholderTextColor={'grey'}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={secureText}
            style={styles.inputField}
            placeholderTextColor={'grey'}
            textContentType='none'
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setSecureText(!secureText)}
          >
            <Text>{secureText ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={onSignInPress} title="Login" color={'#6c47ff'} />
        <Link href="/reset" asChild>
          <Pressable style={styles.button}>
            <Text>Forgot password?</Text>
          </Pressable>
        </Link>
        <Link href="/register" asChild>
          <Pressable style={styles.button}>
            <Text>Create Account</Text>
          </Pressable>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: undefined, 
    aspectRatio: 1, 
    marginBottom: 50, 
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    paddingRight: 50, 
  },
  passwordContainer: {
    position: 'relative', 
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center', 
  },
  toggleButton: {
    position: 'absolute', 
    right: 10, 
    paddingHorizontal: 10,
    height: '100%', 
    justifyContent: 'center',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Login;
