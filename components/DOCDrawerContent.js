import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,

  TouchableRipple,
  Switch
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AuthContext } from './context';


export function DOCDrawerContent(props) {

  const { signOutFunction } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Image style={styles.logo} source={require("../assets/logo.png")} />

            </View>

          </View>

          <Drawer.Section style={[styles.footer, styles.drawerSection]}>
            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="home" size={20} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Dashboard"
              onPress={() => { props.navigation.navigate('DoctorDashboard') }}
            />

            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="users" size={18} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Patients List"
              onPress={() => { props.navigation.navigate('DoctorPatientList') }}
            />


            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="user-plus" size={18} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Admit Patient"
              onPress={() => { props.navigation.navigate('DoctorAdmit') }}
            />

            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="address-book" size={18} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Create Medical Report"
              onPress={() => { props.navigation.navigate('DoctorCreateReport') }}
            />


            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="minus-circle" size={18} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Dicscharge Patient"
              onPress={() => { props.navigation.navigate('DoctorDischarge', { id: "" }) }}
            />
            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="exchange" size={18} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Transfer Patient"
              onPress={() => { props.navigation.navigate('DoctorTransfer') }}
            />


            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="search" size={18} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Search Beds"
              onPress={() => { props.navigation.navigate('DoctorSearchBeds') }}
            />

            <DrawerItem
              icon={({ color, focused }) => (
                <FontAwesome name="sign-in" size={20} color={focused ? '#007c7a' : 'grey'} />
              )}
              label="Enter Test Results"
              onPress={() => { props.navigation.navigate('DoctorEnterResults') }}
            />




          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, focused }) => (
            <FontAwesome name="power-off" size={20} color={focused ? '#007c7a' : 'grey'} />
          )}

          label="Log Out"
          onPress={() => { signOutFunction() }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    paddingLeft: 15
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 70,
    marginTop: 10,

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
});