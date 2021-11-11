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


function HospitalAdminEditPatientInfo({ navigation ,route }) {
  const [patientId, setPatientId] = useState('')
  const [name, setName] = useState('')
  const [bday, setBday] = useState('');
  const [gender, setGender] = useState('');
  const [blood_type, setBloodType] = useState('')
  const [contact_no, setContactNo] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [is_Vaccinated, setIsvaccinated] = useState('');
  const [Num_vaccine, setNumvaccinated] = useState(null);
  const [Type_vaccine, setTypevaccinated] = useState(null);

  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    try {
      if (value) {
        const day = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
        setBday(value.toISOString().slice(0, 10));
      }

    }
    catch (e) {
      alert("Selected BirthDay is Erroried !")

    }

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  var radio_props_gender = [
    { label: 'Male', value: "Male" },
    { label: 'Female', value: "Female" }
  ];


  var radio_props_vaccine = [
    { label: 'No', value: "0" },
    { label: 'Yes', value: "1" },

  ]

  const AppButton = ({ onPress, title }) => (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>

  );

  const updatePatient = async (patient) => {
    const token = await AsyncStorage.getItem('token');
    const URL = `${BASE_URL}/patient/updatePatient/${patient.patient_id}`;
    try {
      const res = await fetch(URL, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patient),
      });

      const response = await res.json();
      
      setName(response.name);
      setBday(response.bday);
      setGender(response.gender);
      setBloodType(response.blood_type);
      setContactNo(response.contact_no);
      setAddress(response.address);
      setDistrict(response.district);
      setIsvaccinated(response.is_Vaccinated);
      setNumvaccinated(response.Num_vaccine);
      setTypevaccinated(response.Type_vaccine);

      if (response){
        navigation.navigate('HospitalAdminViewPatientInfo',{ id: `${patient.patient_id}` })
      }

    } catch (error) {
      alert((error.message.toString()), [
        { text: "Okay" },
      ]);
    }
  };


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
      setPatientId(response.patient_id);
      setName(response.name);
      setBday(response.bday);
      setGender(response.gender);
      setBloodType(response.blood_type);
      setContactNo(response.contact_no);
      setAddress(response.address);
      setDistrict(response.district);
      setIsvaccinated(response.is_Vaccinated);
      setNumvaccinated(response.Num_vaccine);
      setTypevaccinated(response.Type_vaccine);

    } catch (error) {
      alert((error.message.toString()), [
        { text: "Okay" },
      ]);
    }
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPatientDetails(route.params.id);
    });
  }, [navigation,route]);

  const handleSubmitPress = () => {
    if (!name) {
      alert("Name can't be empty !");
      return;
    }
    if (!bday) {
      alert("Date of Birthday can't be empty !");
      return;
    }

    if (!contact_no) {
      alert("Contactnumber can't be empty !");
      return;

    } if (!district || district == 'disabled') {
      alert("District can't be empty !");
      return;
    }

    if (!blood_type || blood_type == 'disabled') {
      alert("Blood Type can't be empty !");
      return;
    }
    updatePatient({ patient_id:patientId, name, bday,gender,blood_type,contact_no,address,district,is_Vaccinated,Type_vaccine,Num_vaccine});
  };

  return (
      <SafeAreaView style={styles.footer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>EDIT PATIENT INFORMATION</Text>
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
              Patient Id: {patientId}
            </Text>
          </View>


          <Text style={styles.textFooter}>Patient Name</Text>
          <View style={styles.action}>
            <TextInput
                placeholder="Enter name"
                value={name}
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(name) => setName(name)}
            />
          </View>

          {isPickerShow && (
              <DateTimePicker
                  value={new Date()}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  // format="YYYY-MM-DD"
                  maximumDate={new Date()}
                  onChange={onChange}
                  style={styles.datePicker}
              />
          )}

          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Text style={styles.textFooter}>Date of Birth</Text>
            {/* <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>Gender</Text> */}
          </View>

          <View style={styles.action1} onPress={showPicker}>
            <FontAwesome name="calendar" size={15} onPress={showPicker} {...styles.icons} />
            <Text style={styles.pickedDate}>{bday}</Text>
            <TextInput
                placeholder={bday ? "" : "Select Date"}
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                editable={false}
            />
          </View>

          <Text style={[{ marginTop: 15, }, styles.textFooter]}>District</Text>
          <View style={styles.districtDrop}>
            <Picker
                style={styles.action}
                onValueChange={setDistrict}
                selectedValue={district}

            >
              <Picker.Item label="Select  District" value="disabled" color="#aaa" />

              <Picker.Item label="Ampara" value="Ampara" />
              <Picker.Item label="Anuradhapura" value="Anuradhapura" />
              <Picker.Item label="Batticaloa" value="Batticaloa" />
              <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
              <Picker.Item label="Hambantota" value="Hambantota" />
              <Picker.Item label="Mullaitivu" value="Mullaitivu" />
              <Picker.Item label="Puttalam" value="Puttalam" />
              <Picker.Item label="Colombo" value="Colombo" />
              <Picker.Item label="Galle" value="Galle" />
              <Picker.Item label="Gampaha" value="Gampaha" />
              <Picker.Item label="Jaffna" value="Jaffna" />
              <Picker.Item label="Hambantota" value="Hambantota" />
              <Picker.Item label="Matara" value="Matara" />
              <Picker.Item label="Kalutara" value="Kalutara" />
              <Picker.Item label="Matara" value="Matara" />
              <Picker.Item label="Kandy" value="Kandy" />
              <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
              <Picker.Item label="Hambantota" value="Hambantota" />
              <Picker.Item label="Mullaitivu" value="Mullaitivu" />
              <Picker.Item label="Puttalam" value="Puttalam" />
              <Picker.Item label="NuwaraEliya" value="NuwaraEliya" />
              <Picker.Item label="Trincomalee" value="Trincomalee" />

            </Picker>
          </View>


          <Text style={[{ marginTop: 15 }, styles.textFooter]}>Contact Number</Text>
          {/* <TextInput keyboardType={'phone-pad'} /> */}

          <View style={styles.action3}>
            {/* <FontAwesome name="phone" size={15} onPress={showPicker} {...styles.icons} /> */}
            <PhoneInput
                defaultCode="LK"
                containerStyle={{
                  width: 133,
                  height: 30,
                  marginTop: 1,
                  // marginLeft: 20,
                  // marginRight: 10,
                  alignSelf: 'center'
                }}
            />
            <TextInput
                placeholder="Enter Contact Number "
                value={contact_no}
                keyboardType={'numeric'}
                placeholderTextColor="#666666"
                style={styles.textInput1}
                // autoCapitalize="none"
                onChangeText={(contact_no) => setContactNo(contact_no)}
                autoCorrect={false}
            />
          </View>




          <Text style={[styles.textFooter, { marginTop: 15 }]}>Address</Text>
          <View style={styles.action}>
            <TextInput
                placeholder="Enter  Address"
                placeholderTextColor="#666666"
                value={address}
                multiline={true}
                numberOfLines={4}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(address) => setAddress(address)}
            />

          </View>

          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Text style={styles.textFooter}>Blood Type</Text>

            <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>Gender</Text>

          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 0.5, }, styles.BloodDrop]}>
              <Picker
                  style={styles.action}
                  onValueChange={setBloodType}
                  selectedValue={blood_type}

              >
                <Picker.Item label="Select " value="disabled" color="#aaa" />
                <Picker.Item label="A+" value="A+" />

                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="O-" value="O-" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="AB-" value="AB-" />

              </Picker>
            </View>


            <View style={[{ marginLeft: 5 }, styles.action1]}>

              <RadioForm
                  radio_props={radio_props_gender}
                  buttonSize={10}
                  buttonOuterSize={18}
                  onPress={(value) => setGender(value)}
                  formHorizontal={true}
              />

            </View>


          </View>

          <Text style={[{ marginTop: 15 }, styles.textFooter]}>Is Vaccinated</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ marginLeft: 5, flex: .5, }, styles.action1]}>

              <RadioForm
                  radio_props={radio_props_vaccine}
                  buttonSize={10}
                  buttonOuterSize={18}
                  onPress={(value) => setIsvaccinated(value)}
                  formHorizontal={true}
              />

            </View>
          </View>

          {"1" == is_Vaccinated ? (
                  <>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                      <Text style={styles.textFooter}>Vaccine Type</Text>
                      <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>No.Vaccine</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[{ flex: 0.5, }, styles.BloodDrop]}>
                        <Picker
                            style={styles.action}
                            onValueChange={setTypevaccinated}
                            selectedValue={Type_vaccine}

                        >
                          <Picker.Item label="Select " value="disabled" color="#aaa" />
                          <Picker.Item label="Sputnik V" value="Sputnik V" />
                          <Picker.Item label="Sinopharm" value="Sinopharm" />
                          <Picker.Item label="Sinovac" value="Sinovac" />
                          <Picker.Item label="Pfizer" value="Pfizer" />
                          <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                          <Picker.Item label="Moderna" value="Moderna" />
                        </Picker>
                      </View>


                      <View style={[{ flex: .5, }, styles.BloodDrop]}>
                        <Picker
                            style={styles.action}
                            onValueChange={setNumvaccinated}
                            selectedValue={Num_vaccine}

                        >
                          <Picker.Item label="Select" value="disabled" color="#aaa" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                        </Picker>
                      </View>


                    </View>
                  </>
              ) :
              (null)
          }

          <AppButton onPress={handleSubmitPress} title={'Save Changes'}/>

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
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
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




export default HospitalAdminEditPatientInfo;
