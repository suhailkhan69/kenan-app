import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbarr from './Navbar';
const datetimeselection = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor, doctorNumber } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleConfirm = async () => {
    try {
      const patientId = await AsyncStorage.getItem('patientId');

      const appointmentDetails = {
        doctor,
        date,
        patientId,
        doctorNumber
      };

      await AsyncStorage.setItem('appointmentDetails', JSON.stringify(appointmentDetails));
      navigation.navigate('symptoms'); // Navigate to Symptoms page
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
        <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showTimepicker}>
          <Text style={styles.buttonText}>Select Time</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Date and Time</Text>
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
  button: {
    backgroundColor: '#189cb3',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#189cb3',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default datetimeselection;
