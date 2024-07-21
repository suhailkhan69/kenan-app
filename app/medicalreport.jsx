import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Navbarr from './Navbar';

const medicalreport = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>YOUR MEDICAL REPORTS</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.date}>May 4, 2024</Text>
          <Text style={styles.cardText}>Floor check</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.date}>May 5, 2024</Text>
          <Text style={styles.cardText}>Floor check</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.date}>May 6, 2024</Text>
          <Text style={styles.cardText}>Floor check</Text>
        </View>
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
    flex: 0.3, // Takes 30% of the screen height
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
    flex: 0.7, // Takes 70% of the screen height
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

export default medicalreport;
