import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Link } from 'expo-router';

const Inversenavbar = () => {
  const [activeIcon, setActiveIcon] = useState(null);

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
        style={[
          styles.navItem,
          activeIcon === 'profile' && styles.activeNavItem
        ]}
        onPress={() => setActiveIcon('profile')}
      >
        <Link href="/profile">
          <Icon
            name="user"
            style={[
              styles.navIcon,
              activeIcon === 'profile' && styles.activeNavIcon
            ]}
          />
        </Link>
      </TouchableOpacity>
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
});

export default Inversenavbar;
