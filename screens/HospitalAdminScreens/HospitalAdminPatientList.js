import React, { useState, useEffect, useRef } from "react";
import {BASE_URL} from "../../dev.config";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Picker,
  Button,
  StatusBar,
  TextInput,
} from "react-native";
import { Drawer } from 'react-native-paper';
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from '../../components/context';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import Picker from 'react-native-select-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { DataTable } from 'react-native-paper';

function HospitalAdminPatientList({ navigation }) {

  const [patients, setPatients] = useState([]);

  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>

  );

  const listPatients = async () => {
    const token = await AsyncStorage.getItem('token');
    const URL = `${BASE_URL}/patient/getPatients`;
    try {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await res.json();

      setPatients(response);

    } catch (error) {
      alert((error.message.toString()), [
        { text: "Okay" },
      ]);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      listPatients();
    });
}, [navigation,]);


  return (
    <SafeAreaView style={styles.footer}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>PATIENTS LIST</Text>
        <View
          style={{
            borderBottomColor: "#009387",
            borderBottomWidth: 2,
          }}
        />
      </View>

      <ScrollView>
        <ScrollView  horizontal={true}>
      <DataTable>
      <DataTable.Header>
        <DataTable.Title style={styles.tableHeader}><Text style={styles.tableHeading}>Patient Id</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeading}>Patient Name</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeading}>Patiet Information</Text></DataTable.Title>
      </DataTable.Header>
      {patients.map((patient) => (
        <DataTable.Row key={patient.patient_id}>
          <DataTable.Cell>{patient.patient_id}</DataTable.Cell>
          <DataTable.Cell>{patient.name}</DataTable.Cell>
          <DataTable.Cell><AppButton onPress={() => navigation.navigate('HospitalAdminViewPatientInfo',{ id: `${patient.patient_id}` })} title={'Patient Info'}/></DataTable.Cell>
        </DataTable.Row>
       ))}
      </DataTable>
      </ScrollView>
      </ScrollView>
    </SafeAreaView >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#009387",
  },
  header: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  tableHeader: {
    textAlign: 'center',
  },
  tableHeading: {
    fontSize: 15,
    alignSelf: 'center'
  },
  districtDrop: {
    width: 300,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "#007c7a",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center'
  },
  BloodDrop: {
    width: 300,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderColor: "#007c7a",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center'
  },
  inner: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textHeader: {
    color: "#009387",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center"
  },
  textFooter: {
    color: "#007c7a",
    fontSize: 16,
  },
  box: {
    width: "50%",
    height: "50%",
    padding: "5"
  },
  action: {

    flexDirection: "row",
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#007c7a",
    padding: 5,
    alignItems: "center",
  },
  action1: {
    flex: 0.5,
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#007c7a",
    padding: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
  action2: {

    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#007c7a",
    padding: 5,
    alignItems: "center",
  },
  action3: {

    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#007c7a",
    padding: 5,
    alignItems: "center",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 20,
    color: "#000",
    fontSize: 15,

  },
  textInput1: {
    flex: 1,
    marginTop: 1,
    paddingLeft: 1,

    color: "#000",
    fontSize: 15,

  },
  icons: {
    color: "#007c7a",


  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#009387",
    alignItems: "center",
    borderColor: "#20d1ce",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  pickedDate: {
    paddingLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  btnContainer: {
    padding: 30,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },


});




export default HospitalAdminPatientList;