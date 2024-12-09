import { Button, TextInput, View, StyleSheet, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import {router, Stack} from 'expo-router';
import React from 'react';

const Register = () => {

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [secureText, setSecureText] = useState(true); 
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const [isValidEmail, setIsValidEmail] = useState(true); 
  const [passwordValid, setPasswordValid] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  async function signUp(userInfo: {email: string, password: string, full_name: string, username: string}) {
    await fetch("https://backend-toga-r5s3.onrender.com/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userInfo),
    }).then((response) => console.log(response)).then(() => {router.replace("/login")}).catch(error => console.log(error));
  }

  const validatePassword = (password: string) => {
    setPassword(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*_?]/.test(password);
    const hasMinLength = password.length >= 8;

    setPasswordValid(hasUppercase && hasSpecialChar && hasMinLength);
  };

  const validateEmail = (email: string) => {
    setEmailAddress(email);
    if (email === '') {
      setIsValidEmail(true); // Don't show error if email is empty
    } else if (email.endsWith('@lsu.edu')) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleRetypePassword = (text: string) => {
    setRetypePassword(text);
    if (text !== password && text.length > 0) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const onSignUpPress = async () => {

    try {
      await signUp({
        email: emailAddress,
        password: password,
        full_name: fullName,
        username: username
      });

    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen />
        {/*<Spinner visible={loading} />*/}
            <TextInput
                autoCapitalize="none"
                placeholder="Full name"
                value={fullName}
                onChangeText={(value) => setFullName(value)}
                style={styles.inputField}
                placeholderTextColor={'grey'}
            />
            <TextInput
                autoCapitalize="none"
                placeholder="username"
                value={username}
                onChangeText={(value) => setUsername(value)}
                style={styles.inputField}
                placeholderTextColor={'grey'}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="geauxtigers@lsu.edu"
              value={emailAddress}
              onChangeText={validateEmail}
              style={styles.inputField}
              placeholderTextColor={'grey'}
            />
            {emailAddress !== '' && !isValidEmail && (
              <Text style={styles.errorText}>Accounts must be created with an LSU email</Text>
            )}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                onChangeText={validatePassword}
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
            <TextInput
              placeholder="Retype Password"
              onChangeText={handleRetypePassword}
              secureTextEntry
              style={styles.inputField}
              placeholderTextColor={'grey'}
              textContentType='none'
            />
            {!passwordsMatch && retypePassword.length > 0 && (
              <Text style={styles.errorText}>Passwords must match</Text>
            )}
            {!passwordValid && password.length > 0 && (
              <View style={styles.passwordRequirements}>
                <Text style={styles.errorText}>• Passwords must be at least 8 characters</Text>
                <Text style={styles.errorText}>• Passwords must contain at least 1 uppercase letter</Text>
                <Text style={styles.errorText}>• Passwords must contain at least 1 special character: !@#$%^&*_?</Text>
              </View>
            )}
            <Button
              onPress={onSignUpPress}
              title="Sign up"
              color={'#92CAFF'}
              disabled={
                !passwordValid || !passwordsMatch || !isValidEmail || !password || !retypePassword
              }
            />
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
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#92CAFF',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    position: 'relative',
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#92CAFF',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  passwordRequirements: {
    marginVertical: 8,
  },
});

export default Register;
