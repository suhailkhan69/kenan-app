import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity, RefreshControl, ScrollView, Modal, Image, BackHandler } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Inversenavbar from './Inversenavbar';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../conifg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const fetchWithRetry = async (url, options, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await axios(url, options);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
};

const appointmentdetails = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [consultationData, setConsultationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmentStage, setAppointmentStage] = useState('initial');
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const fetchAppointmentStatus = async () => {
    try {
      const patientId = await AsyncStorage.getItem('patientId');
      const token = await AsyncStorage.getItem('userToken');

      if (!patientId || !token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetchWithRetry(`${API_BASE_URL}/api/patient/${patientId}/appointment-status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointmentData(response.data.data.appointment);
      setAppointmentStage(response.data.data.stage);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error('Error fetching appointment status:', err);
      if (err.response && err.response.status === 401) {
        Alert.alert("Session Expired", "Please login again");
        router.push('/login');
      } else {
        setError('Failed to fetch appointment status');
      }
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchConsultationDetails = async () => {
    try {
      const patientId = await AsyncStorage.getItem('patientId');
      const token = await AsyncStorage.getItem('userToken');

      if (!patientId || !token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetchWithRetry(`${API_BASE_URL}/api/patient/${patientId}/consultation-details`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setConsultationData(response.data.data);
      setConsultationStarted(true);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching consultation details:', err);
      if (err.response && err.response.status === 401) {
        Alert.alert("Session Expired", "Please login again");
        router.push('/login');
      } else if (err.response && err.response.status === 404) {
        setTimeout(fetchConsultationDetails, 5000); // Retry after 5 seconds
      } else {
        setError('Failed to fetch consultation details');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAppointmentStatus();
    const interval = setInterval(fetchAppointmentStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (appointmentStage === 'consultation_started') {
      fetchConsultationDetails();
    }
  }, [appointmentStage]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true; // Prevent default back behavior
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointmentStatus();
    if (appointmentStage === 'consultation_started') {
      fetchConsultationDetails();
    }
  };

  const handleEndConsultation = () => {
    setModalVisible(true);
  };

  const confirmEndConsultation = () => {
    setModalVisible(false);
    router.push('/appointment');
  };

  const renderContent = () => {
    if (loading) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (!appointmentData) {
      return <Text style={styles.noDataText}>No appointment data found.</Text>;
    }

    switch (appointmentStage) {
      case 'initial':
        return <Text style={styles.stageText}>Please proceed to Reception to do the payment</Text>;
      case 'checked_in':
        return (
          <View>
            <Text style={styles.stageText}>Doctor: {appointmentData.doctorName}</Text>
            <Text style={styles.stageText}>Room Number: {appointmentData.roomNumber}</Text>
            <Text style={styles.stageText}>Number of patients waiting: {appointmentData.waitingCount}</Text>
          </View>
        );
      case 'consultation_started':
        if (!consultationStarted) {
          return <Text style={styles.stageText}>Your consultation has started</Text>;
        } else if (consultationData) {
          return (
            <View>
              <Text style={styles.stageText}>Your consultation details:</Text>
              <Text style={styles.stageText}>Please Proceed To {consultationData.selectedOption}</Text>
              {consultationData.selectedOption !== 'pharmacy' && (
                <>
                  <Text style={styles.stageText}>Doctor's Notes: {consultationData.additionalNotes}</Text>
                  <Text style={styles.stageText}>Estimated Time: {consultationData.estimatedTime}</Text>
                </>
              )}
            </View>
          );
        } else {
          return <Text style={styles.stageText}>Waiting for consultation details...</Text>;
        }
      case 'lab':
      case 'pharmacy':
        return (
          <View>
            <Text style={styles.stageText}>
              {appointmentStage === 'lab' ? 'Please proceed to the Lab' : 'Please proceed to the Pharmacy'}
            </Text>
            {consultationData && consultationData.selectedOption !== 'pharmacy' && (
              <Text style={styles.stageText}>Doctor's Notes: {consultationData.additionalNotes}</Text>
            )}
          </View>
        );
      default:
        return <Text style={styles.stageText}>Please wait for further instructions</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {/* <View style={styles.header}>
            <Image source={require('../assets/kenan-white 2.png')} style={styles.logo} />
          </View> */}
          <View style={styles.iconContainer}>
            <Image source={require('../assets/doctor-icon.png')} style={styles.doctorIcon} />
          </View>
          <View style={styles.appointmentDetails}>
            <TouchableOpacity style={styles.closeButton} onPress={handleEndConsultation}>
              <Icon name="close-circle" size={30} color="red" />
            </TouchableOpacity>
            {renderContent()}
          </View>
        </View>
      </ScrollView>
      <Inversenavbar />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>WARNING!</Text>
            <Text style={styles.modalText}>Are you sure you want to end the consultation?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonNo]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonYes]}
                onPress={confirmEndConsultation}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#189cb3',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 120, // Move the doctor icon down
    zIndex: 1,
    borderWidth: 4, // Add white border
    borderColor: '#fff', // White color for the border
    borderRadius: 50, // Make the border circular
  },
  doctorIcon: {
    width: 100,
    height: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    
    position: 'relative', // Make sure the header is centered
    top: 20,
  },
  logo: {
    width: 200, // Make the Kenan logo larger
    height: 50,
    resizeMode: 'contain',
    marginLeft: -50, // Adjust the margin to the left
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  appointmentDetails: {
    backgroundColor: 'white',
    padding: 30, // Increase the padding
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '90%',
    minHeight: 150, // Make the text box larger
  },
  stageText: {
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
  loadingText: {
    fontSize: 18,
    color: '#B61111',
  },
  errorText: {
    fontSize: 18,
    color: '#B61111',
  },
  noDataText: {
    fontSize: 18,
    color: '#B61111',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '40%',
    alignItems: 'center',
  },
  buttonNo: {
    backgroundColor: 'red',
  },
  buttonYes: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default appointmentdetails;
