import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HADashboard from './HADashboard';
import HAViewPatientList from './HAViewPatientList';
import HAAdmitPatientScreen from './HAAdmitPatientScreen';
import HADischargePatientScreen from './HADischargePatientScreen';
import HATransferPatientScreen from './HATransferPatientScreen';
import HASearchBedsScreen from './HASearchBedsScreen';
import HAEnterResultScreen from './HAEnterResultScreen';

const Drawer = createDrawerNavigator();

const HASideNavScreen = () => (
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
      <Drawer.Screen name="Dashboard" component={HADashboard} 
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
      <Drawer.Screen name="Patients List" component={HAViewPatientList}  
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
      <Drawer.Screen name="Admit" component={HAAAdmitPatientScreen}
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
      <Drawer.Screen name="Discharge" component={HADischargePatientScreen}
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
      <Drawer.Screen name="Transfer" component={HATransferPatientScreen}
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
      <Drawer.Screen name="Search Beds" component={HASearchBedsScreen} 
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
      <Drawer.Screen name="Enter Test Results" component={HAEnterResultScreen} 
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

export default HASideNavScreen;
