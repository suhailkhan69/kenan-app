import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL } from '../conifg';

const datetimeselectionsymptom = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
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
      const token = await AsyncStorage.getItem('userToken');
      const patientId = await AsyncStorage.getItem('patientId');

      console.log('Submitting symptom data with:', { date, patientId });

      const response = await fetch(`${API_BASE_URL}/api/symptoms`, { // Adjust the endpoint URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, patientId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.data || 'Something went wrong!');
      }

      const result = await response.json();
      console.log('Symptom data submitted:', result.data);

      Alert.alert('Success', 'Symptom data submitted successfully');

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.redBackground}>
        <Text style={styles.header}>Select Date and Time</Text>
      </View>
      <View style={styles.whiteCard}>
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
          <Text style={styles.confirmButtonText}>Submit Symptom Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B61111',
  },
  redBackground: {
    height: '20%',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'normal',
  },
  whiteCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flex: 1,
  },
  button: {
    backgroundColor: '#B61111',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#B61111',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default datetimeselectionsymptom;
