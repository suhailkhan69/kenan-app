import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import Inversenavbar from './Inversenavbar';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_URL } from '../conifg';

const confirmappointment = () => {
  const route = useRoute();
  const { appointmentId } = route.params;
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/appointments/${appointmentId}`);
        setAppointment(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointment details', error);
        setLoading(false);
      }
    };

    fetchAppointment();

    const interval = setInterval(fetchAppointment, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [appointmentId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#189cb3" />
      </SafeAreaView>
    );
  }

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>Error: Appointment not found</Text>
        </View>
        <Inversenavbar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/kenan-white 2.png')} style={styles.logo} />
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/doctor-icon.png')} style={styles.doctorIcon} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>
          {appointment.status === 'approved' 
            ? 'Your appointment has been approved!' 
            : 'You have successfully sent an appointment request!'}
        </Text>
        
        <View style={styles.appointmentDetails}>
          {appointment.status === 'approved' ? (
            <>
              <Text style={styles.appointmentText}>{appointment.doctor}</Text>
              <Text style={styles.appointmentText}>{new Date(appointment.date).toLocaleDateString()}</Text>
              <Text style={styles.appointmentText}>{new Date(appointment.date).toLocaleTimeString()}</Text>
            </>
          ) : (
            <Text style={styles.waitingText}>Waiting for Approval</Text>
          )}
        </View>
        
        <Text style={styles.message}>
          {appointment.status === 'approved' 
            ? 'Our staff has confirmed your appointment. Please be on time!'
            : 'Our staff will contact you soon with your final appointment date and time!'}
        </Text>
        
        <Text style={styles.message}>
          If you have any concerns, contact us!
        </Text>
        
        {appointment.status === 'approved' && (
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText} onPress={() => navigation.navigate('appointmentdetails')}>
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Inversenavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#189cb3',
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  appointmentDetails: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
  },
  appointmentText: {
    color: '#189cb3',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  waitingText: {
    color: '#189cb3',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  message: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  doneButtonText: {
    color: '#B61111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default confirmappointment;
