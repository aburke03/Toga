import { View, StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a password reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

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

            <Button onPress={onRequestReset} title="Send Reset Email" color={'#6c47ff'}></Button>
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
              <TextInput
                placeholder="New password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputField}
              />
            </View>
            <Button onPress={onReset} title="Set new Password" color={'#6c47ff'}></Button>
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
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default PwReset;
