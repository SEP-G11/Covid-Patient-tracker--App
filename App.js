import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "./screens/Homepage";
import Signin from "./screens/Signin";
import DoctorDashboard from "./screens/DoctorScreens/DoctorDashboard";
import HospitalAdminDashboard from "./screens/HospitalAdminScreens/HospitalAdminDashboard";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Homepage"
      >
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
        <Stack.Screen
          name="HospitalAdminDashboard"
          component={HospitalAdminDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
