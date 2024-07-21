import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Image, StyleSheet, Alert, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../conifg';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password
      });

      if (response.data.status === "ok") {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('patientId', response.data.user._id);
        await AsyncStorage.setItem('userName', response.data.user.name); // Store user name
        //Alert.alert("Success", "Login successful");
        router.push('/appointment'); // Navigate to profile or appropriate screen
      } else {
        Alert.alert("Error", response.data.data);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Error", "An error occurred while logging in");
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(handleLogin);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/kenan-white 2.png')}
        style={[styles.logo, { opacity: logoOpacity }]}
      />
      <Animated.View style={[styles.card, { opacity: cardOpacity, transform: [{ scale: cardScale }] }]}>
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
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity style={styles.loginButton} onPress={animateButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.signUpText}>
          No account? <Text onPress={() => router.push('/signup')} style={styles.signUpLink}>Sign up</Text>
        </Text>
      </Animated.View>
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
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF6F61',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 15,
    color: '#fff',
    fontSize: 14,
  },
  signUpText: {
    marginTop: 20,
    color: 'black',
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default login;
