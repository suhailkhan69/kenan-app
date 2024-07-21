import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Inversenavbar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('patientId');
      setLogoutModalVisible(false);
      router.push('/');
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[
          styles.navItem,
          activeIcon === 'appointment' && styles.activeNavItem
        ]}
        onPress={() => setActiveIcon('appointment')}
      >
        <Link href="/appointment">
          <Icon
            name="clock"
            style={[
              styles.navIcon,
              activeIcon === 'appointment' && styles.activeNavIcon
            ]}
          />
        </Link>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navItem,
          activeIcon === 'appointmentdetails' && styles.activeNavItem
        ]}
        onPress={() => setActiveIcon('appointmentdetails')}
      >
        <Link href="/appointmentdetails">
          <Icon
            name="calendar"
            style={[
              styles.navIcon,
              activeIcon === 'appointmentdetails' && styles.activeNavIcon
            ]}
          />
        </Link>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navItem,
          activeIcon === 'reports' && styles.activeNavItem
        ]}
        onPress={() => setActiveIcon('reports')}
      >
        <Link href="/reports">
          <Icon
            name="file-text"
            style={[
              styles.navIcon,
              activeIcon === 'reports' && styles.activeNavIcon
            ]}
          />
        </Link>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setLogoutModalVisible(true)}
      >
        <Icon
          name="power"
          style={styles.navIcon}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: '5%',
    marginBottom: '5%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: '#189cb3',
  },
  navIcon: {
    fontSize: 24,
    color: '#189cb3',
  },
  activeNavIcon: {
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#189cb3',
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Inversenavbar;
