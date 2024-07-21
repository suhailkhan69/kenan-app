import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../conifg';

const signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        name,
        email,
        password
      });

      if (response.data.status === "ok") {
        Alert.alert("Success", "Account created successfully");
        console.log("User ID:", response.data.userId); // Use the userId as needed
        router.push('/login'); // Navigate to the login page
      } else {
        Alert.alert("Error", response.data.data);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the account");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#189cb3',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#b61111',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default signup;