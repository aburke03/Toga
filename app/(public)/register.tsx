import { Button, TextInput, View, StyleSheet, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true); // For show/hide password
  const [isValidEmail, setIsValidEmail] = useState(true); // To track if the email is valid

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Validate the email input in real-time
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
        <Spinner visible={loading} />

        {!pendingVerification && (
          <>
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
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureText}
                style={styles.inputField}
                placeholderTextColor={'grey'}
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setSecureText(!secureText)}
              >
                <Text>{secureText ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>

            <Button onPress={onSignUpPress} title="Sign up" color={'#6c47ff'} disabled={!isValidEmail} />
          </>
        )}

        {pendingVerification && (
          <>
            <View>
              <TextInput
                value={code}
                placeholder="Enter Code"
                style={styles.inputField}
                onChangeText={setCode}
                placeholderTextColor={'grey'}
                keyboardType='numeric'
              />
            </View>
            <Button onPress={onPressVerify} title="Verify Email" color={'#6c47ff'} />
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;
