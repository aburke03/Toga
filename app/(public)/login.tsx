import {Link, router} from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  async function signIn(userInfo: {email: string, password: string}) {
    try {
      const response = await fetch("https://backend-toga-r5s3.onrender.com/api/auth/login", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
      } else {
          const data = await response.json();
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('user-id', data.user.id);

          // Store organization data if it exists
          if (data.user.organization) {
              await AsyncStorage.setItem('organization-id', data.user.organization.organization_id);
              await AsyncStorage.setItem('organization-name', data.user.organization.organization_name);
          }

          router.push('/home');
      }
  } catch (error) {
      console.error(error);
  }
  }

  const onSignInPress = async () => {
    try {
      await signIn({
        email: emailAddress,
        password: password,
      });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/toga.png')} 
          style={styles.image} 
          resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="geauxtigers@lsu.edu"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
            placeholderTextColor={'#94a3b8'}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={setPassword}
              secureTextEntry={secureText}
              style={[styles.inputField, styles.passwordInput]}
              placeholderTextColor={'#94a3b8'}
              textContentType='none'
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setSecureText(!secureText)}
            >
              <Text style={styles.toggleButtonText}>{secureText ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={onSignInPress}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <Link href="/reset" asChild>
              <Pressable>
                <Text style={styles.linkText}>Forgot password?</Text>
              </Pressable>
            </Link>

            <Link href="/register" asChild>
              <Pressable>
                <Text style={styles.createAccountText}>Create Account</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92CAFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
  },
  formContainer: {
    flex: 0.6,
    padding: 24,
    justifyContent: 'center',
  },
  image: {
    width: '60%',
    height: undefined,
    aspectRatio: 1,
  },
  inputField: {
    height: 55,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 70,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    height: '100%',
    justifyContent: 'center',
  },
  toggleButtonText: {
    color: '#92CAFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#92CAFF',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#92CAFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    alignItems: 'center',
    gap: 16,
  },
  linkText: {
    color: '#92CAFF',
    fontSize: 16,
    fontWeight: '500',
  },
  createAccountText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;