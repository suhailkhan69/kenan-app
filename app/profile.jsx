import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Navbar from './Navbar';
import { API_BASE_URL } from '../conifg';

const profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchUserData = async () => {
      if (params.userData) {
        // If user data is passed as a parameter, use it
        setUser(JSON.parse(params.userData));
      } else {
        // Otherwise, try to fetch it using the stored token
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          try {
            const response = await axios.get(`${API_BASE_URL}/api/user/me`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log('User data response:', response.data);
            setUser(response.data.data);
          } catch (error) {
            //console.error('Error fetching user data:', error);
            //Alert.alert('Error', 'Failed to fetch user data');
          }
        } else {
          console.log('No token found');
          // Optionally redirect to login page if no token is found
          // router.push('/login');
        }
      }
    };

    fetchUserData();
  }, [params.userData]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('patientId');
      router.push('/');
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PROFILE</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.infoCard}>
          <Text>Email: {user.email}</Text>
          <View style={styles.infoLine} />
          <Text>User ID: {user._id}</Text>
          <View style={styles.infoLine} />
          {/* Add more user details as needed */}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B61111',
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b61111',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  content: {
    flex: 0.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textTransform: 'uppercase',
    color: '#333',
    letterSpacing: 1.5,
  },
  infoCard: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#b61111',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default profile;