import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './screens/Homepage';
import Signin from './screens/Signin';
import DoctorSideNavScreen from './screens/DoctorScreens/DoctorSideNavScreen';
import HASideNavScreen from './screens/HospitalAdminScreens/HASideNavScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SideNavScreen">
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen
            name="DoctorSideNavScreen"
            component={DoctorSideNavScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="HASideNavScreen"
            component={HASideNavScreen}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;