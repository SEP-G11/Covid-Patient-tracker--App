import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DoctorDashboard from './DoctorDashboard';
import DoctorViewPatientList from './DoctorViewPatientList';
import DoctorAdmitPatientScreen from './DoctorAdmitPatientScreen';
import DoctorCreateReportScreen from './DoctorCreateReportScreen';
import DoctorDischargePatientScreen from './DoctorDischargePatientScreen';
import DoctorTransferPatientScreen from './DoctorTransferPatientScreen';
import DoctorSearchBedsScreen from './DoctorSearchBedsScreen';
import DoctorEnterResultScreen from './DoctorEnterResultScreen';

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
      <Drawer.Screen name="Dashboard" component={DoctorDashboard} 
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
      <Drawer.Screen name="Patients List" component={DoctorViewPatientList}  
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
      <Drawer.Screen name="Admit" component={DoctorAdmitPatientScreen}
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
      <Drawer.Screen name="Create Medical Report" component={DoctorCreateReportScreen}
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
      <Drawer.Screen name="Discharge" component={DoctorDischargePatientScreen}
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
      <Drawer.Screen name="Transfer" component={DoctorTransferPatientScreen}
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
      <Drawer.Screen name="Search Beds" component={DoctorSearchBedsScreen} 
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
      <Drawer.Screen name="Enter Test Results" component={DoctorEnterResultScreen} 
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
