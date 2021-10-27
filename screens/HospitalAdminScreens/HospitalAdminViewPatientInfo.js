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
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


function HospitalAdminViewPatientInfo({ navigation ,route }) {
  const patientId = route.params.id

  const [patient, setPatient] = useState({});

  const getAge = bday => {
    if (Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10)) {
      return (Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10));
    }
    else {
      return Math.round(((new Date() - new Date(bday).getTime()) / 3.15576e+10 + Number.EPSILON) * 1000) / 1000;
    }
  };


  const AppButton = ({ onPress, title }) => (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>

  );

  const getPatientDetails = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const URL = `${BASE_URL}/patient/patientDetails/${id}`;
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

      setPatient(response);

    } catch (error) {
      alert((error.message.toString()), [
        { text: "Okay" },
      ]);
    }
  };



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPatientDetails(patientId);
    });
  }, [navigation,]);

  return (
      <SafeAreaView style={styles.footer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>PATIENT INFORMATION</Text>
          <View
              style={{
                borderBottomColor: "#009387",
                borderBottomWidth: 2,
              }}
          />
        </View>


        <ScrollView style={{ paddingRight: 20 }}>

          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{margin: 10,fontSize: 18}}>
              Id: {patient.patient_id}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Name: {patient.name}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Age: { getAge(patient.bday)}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Birth Day: {patient.bday}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Gender: {patient.gender}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Blood Type: {patient.blood_type}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Contact No: {patient.contact_no}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Address: {patient.address}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Disctrict: {patient.district}
            </Text>
            <Text style={{margin: 10,fontSize: 18}}>
              Vaccination Details: {patient.is_Vaccinated}{patient.Type_vaccine}{patient.Num_vaccine}
            </Text>
          </View>


          <AppButton onPress={() => navigation.navigate('DoctorViewPatientList')} title={'Back'}/>
          <AppButton onPress={() => navigation.navigate('DoctorEditPatientInfo',{ id: `${patient.patient_id}` })} title={'Update'}/>


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
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#009387",
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#20d1ce",
    borderWidth: 2,

  },
  buttonText: {
    color: "#fff",
    fontSize: 20,

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




export default HospitalAdminViewPatientInfo;
