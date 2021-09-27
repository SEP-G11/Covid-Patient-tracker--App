import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HADashboard from './HADashboard';

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
    <Drawer.Screen name="HADashboard" component={HADashboard} 
            options={{
            title: 'HADashboard',
            drawerIcon: ({color, size}) => (
                <Icon 
                name="home-outline" 
                color={color}
                size={size}
                />
            ),
        }}/>
      
    </Drawer.Navigator>
);

export default HASideNavScreen;
