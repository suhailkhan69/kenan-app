import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native';
import Navbarr from './Navbar';
import { useNavigation } from '@react-navigation/native';

const doctorselection = () => {
  const [expandedSpecialty, setExpandedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigation = useNavigation();

  const specialties = [
    {
      name: "Cardiology",
      doctors: [
        { name: "Dr. John Doe", number: 1 },
        { name: "Dr. Jane Smith", number: 2 },
        { name: "Dr. Mike Johnson", number: 3 }
      ]
    },
    {
      name: "Pediatrics",
      doctors: [
        { name: "Dr. Emily Brown", number: 4 },
        { name: "Dr. David Wilson", number: 5 },
        { name: "Dr. Sarah Lee", number: 6 }
      ]
    },
    {
      name: "Dermatology",
      doctors: [
        { name: "Dr. Alex Taylor", number: 7 },
        { name: "Dr. Chris Anderson", number: 8 },
        { name: "Dr. Lisa Chen", number: 9 }
      ]
    },
    {
      name: "Orthopedics",
      doctors: [
        { name: "Dr. Robert White", number: 10 },
        { name: "Dr. Karen Black", number: 11 },
        { name: "Dr. Tom Green", number: 12 }
      ]
    }
  ];

  const toggleSpecialty = (index) => {
    setExpandedSpecialty(expandedSpecialty === index ? null : index);
    setSelectedDoctor(null);
  };

  const handleDoctorClick = (doctor, specialtyIndex) => {
    setSelectedDoctor(selectedDoctor === doctor ? null : doctor);
    navigation.navigate('datetimeselection', { doctor: doctor.name, doctorNumber: doctor.number });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/kenan-white 2.png')} style={styles.logo} />
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/doctor-icon.png')} style={styles.doctorIcon} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {specialties.map((specialty, index) => (
          <View key={index} style={styles.specialtyContainer}>
            <TouchableOpacity 
              style={styles.specialtyButton} 
              onPress={() => toggleSpecialty(index)}
            >
              <Image source={require('../assets/doctor-icon.png')} style={styles.specialtyIcon} />
              <Text style={styles.specialtyText}>{specialty.name}</Text>
              <Text style={styles.chevronIcon}>
                {expandedSpecialty === index ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
            {expandedSpecialty === index && (
              <View style={styles.doctorList}>
                {specialty.doctors.map((doctor) => (
                  <TouchableOpacity 
                    key={doctor.number} 
                    style={[
                      styles.doctorItem, 
                      selectedDoctor === doctor && styles.selectedDoctor
                    ]}
                    onPress={() => handleDoctorClick(doctor, index)}
                  >
                    <Image source={require('../assets/doctor-icon.png')} style={styles.doctorIconItem} />
                    <Text style={[
                      styles.doctorName,
                      selectedDoctor === doctor && styles.selectedDoctorText
                    ]}>{doctor.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
    width: 150, // Increased width for the logo
    height: 60, // Increased height for the logo
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
  scrollContainer: {
    padding: 20,
  },
  specialtyContainer: {
    marginBottom: 20,
  },
  specialtyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#189cb3',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
  specialtyIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  specialtyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  chevronIcon: {
    color: '#fff',
    fontSize: 18,
  },
  doctorList: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  selectedDoctor: {
    backgroundColor: '#189cb3',
  },
  doctorIconItem: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  doctorName: {
    fontSize: 16,
    color: '#333',
  },
  selectedDoctorText: {
    color: '#fff',
  },
});

export default doctorselection;
