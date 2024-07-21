import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Image } from 'react-native';
import Navbarr from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../conifg';

const symptoms = () => {
  const [symptoms, setSymptoms] = useState('');
  const navigation = useNavigation();

  const handleInputChange = (text) => {
    setSymptoms(text);
  };

  const handleConfirm = async () => {
    try {
      const appointmentDetails = JSON.parse(await AsyncStorage.getItem('appointmentDetails'));

      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...appointmentDetails, symptoms })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.data || 'Something went wrong!');
      }

      const result = await response.json();
     
      navigation.navigate('confirmappointment', { appointmentId: result.data._id });

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/kenan-white 2.png')} style={styles.logo} />
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/doctor-icon.png')} style={styles.doctorIcon} />
      </View>
      <View style={styles.content}>
        <Text style={styles.headerText}>Please Enter Your Symptoms Below.</Text>
        <TextInput
          value={symptoms}
          onChangeText={handleInputChange}
          placeholder="Type your symptoms here"
          style={styles.symptomInput}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
        />
        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
        </TouchableOpacity>
      </View>
      <Navbarr />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#189cb3',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, // Increased height for the blue part
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 20,
  },
  logo: {
    width: 200, // Increased width for the logo
    height: 80, // Increased height for the logo
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: -50, // Move the icon up to overlap with the header
    zIndex: 1, // Ensure the icon is on top of other elements
  },
  doctorIcon: {
    width: 100, // Increased size of the doctor icon
    height: 100, // Increased size of the doctor icon
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 50, // Half of the width/height to make it a circle
    backgroundColor: '#189cb3',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#189cb3',
    marginVertical: 20,
  },
  symptomInput: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 200,
  },
  confirmButton: {
    backgroundColor: '#189cb3',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default symptoms;
