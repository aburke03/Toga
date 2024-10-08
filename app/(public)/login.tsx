import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'; // Import Image component
import Spinner from 'react-native-loading-spinner-overlay';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true); 

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
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
