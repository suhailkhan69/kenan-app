import { StyleSheet } from 'react-native';
import React from 'react';
import { Slot, Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="appointment" options={{ headerShown: false }} />
      <Stack.Screen name="appointmentdetails" options={{ headerShown: false }} />
      <Stack.Screen name="confirmappointment" options={{ headerShown: false }} />
      <Stack.Screen name="doctorselection" options={{ headerShown: false }} />
      <Stack.Screen name="reports" options={{ headerShown: false }} />
      <Stack.Screen name="labreport" options={{ headerShown: false }} />
      <Stack.Screen name="medicalreport" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="symptoms" options={{ headerShown: false }} />
      <Stack.Screen name="prescriptions" options={{ headerShown: false }} />
      <Stack.Screen name="datetimeselection" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
