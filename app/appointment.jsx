import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Linking, Image, ActivityIndicator, Animated } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbarr from './Navbar';

const appointment = () => {
  const [userName, setUserName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [loading, setLoading] = useState(true);

  const greetingOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const id = await AsyncStorage.getItem('patientId');

        if (name !== null) {
          setUserName(name);
        }
        if (id !== null) {
          setPatientId(id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    Animated.parallel([
      Animated.timing(greetingOpacity, {
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

  const handleCall = () => {
    const phoneNumber = 'tel:9074534796'; // Replace with actual receptionist number
    Linking.openURL(phoneNumber);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#189cb3" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/SignIn.png')} style={styles.banner} />
      </View>
      <Animated.View style={[styles.greetingContainer, { opacity: greetingOpacity }]}>
        <Text style={styles.greetingText}>Welcome to Kenan,</Text>
        <Animated.View style={[styles.userCard, { transform: [{ scale: cardScale }] }]}>
          <Text style={styles.userCardText}>Name: {userName}</Text>
          <Text style={styles.userCardText}>Patient ID: {patientId}</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.cardContainer}>
        <Animated.View style={{ transform: [{ scale: cardScale }] }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress('doctor')}
          >
            <Link href="/doctorselection" style={styles.cardTextLink}>
              <View style={styles.cardContent}>
                <Image source={require('../assets/doctor-icon.png')} style={styles.cardIcon} />
                <Text style={styles.cardText}>Select A Doctor</Text>
              </View>
            </Link>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: cardScale }] }}>
          <TouchableOpacity
            style={styles.card}
            onPress={handleCall}
          >
            <View style={styles.cardContent}>
              <Image source={require('../assets/receptionist-icon.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Call the receptionist</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Navbarr />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    backgroundColor: '#189cb3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  greetingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  greetingText: {
    color: '#189cb3',
    fontSize: 24,
    fontWeight: '300',
  },
  userCard: {
    backgroundColor: '#189cb3',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
  },
  userCardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#189cb3',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 150,
    height: 180,
    justifyContent: 'center',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTextLink: {
    textDecorationLine: 'none',
  },
  cardText: {
    fontSize: 16, // Increased font size
    color: '#fff',
    textAlign: 'center',
  },
});

export default appointment;
