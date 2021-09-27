import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DoctorDashboard from './DoctorDashboard';
import PatientList from './PatientList';
import Admit from './Admit';
import CreateMedicalReport from './CreateMedicalReport';
import Discharge from './Discharge';
import Transfer from './Transfer';
import SearchBeds from './SearchBeds';
import EnterTestResults from './EnterTestResults';

const Drawer = createDrawerNavigator();

const DoctorSideNavScreen = () => (
    <Drawer.Navigator   
      screenOptions={{
        drawerStyle: {
          paddingTop: 70,
          backgroundColor: '#009387',
          width: 280,
        },
        drawerInactiveTintColor: '#fff',
        drawerActiveTintColor: '#000',
        drawerActiveBackgroundColor: '#fff'
      }}>
      <Drawer.Screen name="DoctorDashboard" component={DoctorDashboard} 
        options={{
          title: 'Dashboard',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="home-outline" 
            color={color}
            size={size}
            />
          ),
      }}/>
      <Drawer.Screen name="Patients List" component={PatientList}  
        options={{
          title: 'Patients List',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="account-details-outline" 
            color={color}
            size={size}
            />
          ),
      }}/>
      <Drawer.Screen name="Admit" component={Admit}
        options={{
          title: 'Admit',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="account-plus-outline" 
            color={color}
            size={size}
            />
          ),
      }}/>
      <Drawer.Screen name="Create Medical Report" component={CreateMedicalReport}
        options={{
          title: 'Create Medical Report',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="file-chart-outline" 
            color={color}
            size={size}
            />
          ),
      }}/>
      <Drawer.Screen name="Discharge" component={Discharge}
        options={{
          title: 'Discharge',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="account-minus-outline" 
            color={color}
            size={size}
            />
          ),
      }}/>
      <Drawer.Screen name="Transfer" component={Transfer}
        options={{
          title: 'Transfer',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="bank-transfer" 
            color={color}
            size={size}
            />
          ),
      }}/>
      <Drawer.Screen name="Search Beds" component={SearchBeds} 
        options={{
          title: 'Search Beds',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="magnify" 
            color={color}
            size={size}
            />
          ),
      }}/>
      <Drawer.Screen name="Enter Test Results" component={EnterTestResults} 
        options={{
          title: 'Enter Test Results',
          drawerIcon: ({color, size}) => (
            <Icon 
            name="account-alert-outline" 
            color={color}
            size={size}
            />
          ),
      }}/>
    </Drawer.Navigator>
);

export default DoctorSideNavScreen;
