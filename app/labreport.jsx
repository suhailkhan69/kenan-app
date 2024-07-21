import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbarr from './Navbar';
import { API_BASE_URL } from '../conifg';

const labreport = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchPatientId = async () => {
      try {
        const id = await AsyncStorage.getItem('patientId');
        if (id) {
          setPatientId(id);
        } else {
          Alert.alert("Error", "No patient ID found");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while retrieving the patient ID");
      }
    };

    fetchPatientId();
  }, []);

  useEffect(() => {
    if (patientId) {
      const fetchFiles = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/uploads/${patientId}`);
          if (response.data.status === "ok") {
            setFiles(response.data.data);
          } else {
            Alert.alert("Error", response.data.data);
          }
        } catch (error) {
          Alert.alert("Error", "An error occurred while fetching files");
        } finally {
          setLoading(false);
        }
      };

      fetchFiles();
    }
  }, [patientId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const renderFileItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.cardText}>{item.originalname}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>YOUR LAB REPORTS</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={files}
          renderItem={renderFileItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <Navbarr />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#189cb3',
  },
  header: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#189cb3',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  content: {
    flex: 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '90%',
    marginTop: 20,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#000',
  },
});

export default labreport;
