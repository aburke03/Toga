import { View, StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); 
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const [secureText, setSecureText] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);



  const validatePassword = (password: string) => {
    setPassword(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*_?]/.test(password);
    const hasMinLength = password.length >= 8;

    setPasswordValid(hasUppercase && hasSpecialChar && hasMinLength);
  };

  const handleRetypePassword = (text: string) => {
    setRetypePassword(text);
    if (text !== password && text.length > 0) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Display back button via Stack.Screen, just like in register.tsx */}
        <Stack.Screen options={{ headerBackVisible: true }} />

        {!successfulCreation && (
          <>
            <TextInput
              autoCapitalize="none"
              placeholder="geauxtigers@lsu.edu"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={styles.inputField}
              placeholderTextColor={'grey'}
            />

            <Button title="Send Reset Email" color={'#92CAFF'} />
          </>
        )}

        {successfulCreation && (
          <>
            <View>
              <TextInput
                value={code}
                placeholder="Verification Code"
                style={styles.inputField}
                onChangeText={setCode}
                placeholderTextColor={'grey'}
                keyboardType='numeric'
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="New password"
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
                placeholder="Retype New Password"
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
            </View>
            <Button
              title="Reset Password"
              color={'#92CAFF'}
              disabled={!passwordValid || !passwordsMatch || !password || !retypePassword}
            />
          </>
        )}
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
  errorText: {
    color: 'red',
    marginVertical: 4,
  },
  passwordRequirements: {
    marginVertical: 8,
  },
});

export default PwReset;
