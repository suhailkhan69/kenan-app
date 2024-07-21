import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import Navbarr from './Navbar';

const reports = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/SignIn.png')} style={styles.banner} />
        <Image source={require('../assets/kenan-white 2.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.card}>
          <Icon name="file-document-outline" size={30} color="#ffffff" />
          <Link href="/labreport" style={styles.cardTextLink}>
            <Text style={styles.cardText}>Lab Report</Text>
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <Icon name="file-document-outline" size={30} color="#ffffff" />
          <Link href="/medicalreport" style={styles.cardTextLink}>
            <Text style={styles.cardText}>Medical Summary</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <Navbarr />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#189cb3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 10,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
    marginTop: -30,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: -40,
  },
  card: {
    backgroundColor: '#189cb3',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '90%',
    marginTop: 20,
  },
  cardTextLink: {
    textDecorationLine: 'none',
    marginLeft: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default reports;
