import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./screens/Homepage";
import Signin from "./screens/Signin";


import DoctorDashboard from "./screens/DoctorScreens/DoctorDashboard";
import DoctorAdmit from "./screens/DoctorScreens/DoctorAdmit";
import DoctorCreateReport from "./screens/DoctorScreens/DoctorCreateReport";
import DoctorDischarge from "./screens/DoctorScreens/DoctorDischarge";
import DoctorTransfer from "./screens/DoctorScreens/DoctorTransfer";
import DoctorSearchBeds from "./screens/DoctorScreens/DoctorSearchBeds";
import DoctorEnterResults from "./screens/DoctorScreens/DoctorEnterResults";


import HospitalAdminDashboard from "./screens/HospitalAdminScreens/HospitalAdminDashboard";
import HospitalAdminAdmit from "./screens/HospitalAdminScreens/HospitalAdminAdmit";
import HospitalAdminDischarge from "./screens/HospitalAdminScreens/HospitalAdminDischarge";
import HospitalAdminTransfer from "./screens/HospitalAdminScreens/HospitalAdminTransfer";
import HospitalAdminSearchBeds from "./screens/HospitalAdminScreens/HospitalAdminSearchBeds";
import HospitalAdminEnterResults from "./screens/HospitalAdminScreens/HospitalAdminEnterResults";


import { DrawerItemList } from '@react-navigation/drawer';
import { AuthContext } from './components/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DOCDrawerContent } from './components/DOCDrawerContent';
import { HADrawerContent } from './components/HADrawerContent';
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();


const App = () => {

  const initialLoginState = {
    isLoading: true,
    token: null,
    accType: null

  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          accType: action.accType,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          accType: action.accType,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          token: action.token,
          accType: action.accType,
          isLoading: false,
        };

    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signInFunction: async (userInfo) => {

  
      try {
        await AsyncStorage.setItem('token', userInfo["token"]);
        await AsyncStorage.setItem('accType', userInfo["accType"]);


      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'LOGIN', token: userInfo["token"], accType: userInfo["accType"] });
    },

    signOutFunction: async () => {

      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('accType');

      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    }

  }), []);



  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.token == null ? (

          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Homepage"
          >
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Signin" component={Signin} />
           
          </Stack.Navigator>

        ) : (

          loginState.accType == "DOC" ? (<Drawer.Navigator screenOptions={{ title: false, drawerIcon: false, headerStyle: { backgroundColor: '#fff', elevation: 0 }, }}
            initialRouteName="DoctorDashboard" drawerContent={props =>
              <DOCDrawerContent {...props} />}>
            <Drawer.Screen name="DoctorDashboard" component={DoctorDashboard} />
            <Drawer.Screen name="DoctorAdmit" component={DoctorAdmit} />
            <Drawer.Screen name="DoctorCreateReport" component={DoctorCreateReport} />
            <Drawer.Screen name="DoctorDischarge" component={DoctorDischarge} />
            <Drawer.Screen name="DoctorTransfer" component={DoctorTransfer} />
            <Drawer.Screen name="DoctorSearchBeds" component={DoctorSearchBeds} />
            <Drawer.Screen name="DoctorEnterResults" component={DoctorEnterResults} />


          </Drawer.Navigator>) :

            (<Drawer.Navigator screenOptions={{ title: false, drawerIcon: false, headerStyle: { backgroundColor: '#fff', elevation: 0 }, }}
              initialRouteName="HospitalAdminDashboard" drawerContent={props =>
                <HADrawerContent {...props} />}>
              <Drawer.Screen name="HospitalAdminDashboard" component={HospitalAdminDashboard} />
              <Drawer.Screen name="HospitalAdminAdmit" component={HospitalAdminAdmit} />
              <Drawer.Screen name="HospitalAdminDischarge" component={HospitalAdminDischarge} />
              <Drawer.Screen name="HospitalAdminTransfer" component={HospitalAdminTransfer} />
              <Drawer.Screen name="HospitalAdminSearchBeds" component={HospitalAdminSearchBeds} />
              <Drawer.Screen name="HospitalAdminEnterResults" component={HospitalAdminEnterResults} />

            </Drawer.Navigator>)

        )}
      </NavigationContainer>
    </AuthContext.Provider>

  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  drawerImage: {

    width: 250,
    height: 80,
    marginTop: 50,
    marginBottom: 10,

  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderColor: "#007c7a",
    borderTopWidth: 1,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 50,
    paddingBottom: '100%'
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
});

