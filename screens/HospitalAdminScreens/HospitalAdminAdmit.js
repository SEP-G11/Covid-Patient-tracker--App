import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../dev.config";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioForm from 'react-native-simple-radio-button';


function HospitalAdminAdmit({ navigation }) {

  const [name, setName] = useState("");
  const [bday1, setBday1] = useState("");
  const [bday2, setBday2] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [bloodtype, setBloodtype] = useState("");
  const [district, setDistrict] = useState("");
  const [isvaccinated, setIsvaccinated] = useState("0");
  const [RATresult, setRATresult] = useState("");
  const medicalHistory = "";
  const [Num_vaccine, setNumvaccinated] = useState("0");
  const [Type_vaccine, setTypevaccinated] = useState(null);
  const [bedId, setBedId] = useState("");

  //Automatically assgin bed ID for the patient
  const getBedId = bedInfo => {

    let covidFree = [];
    let normalFree = [];
    if (typeof bedInfo !== 'undefined') {
      if (bedInfo != null) {
        Array.from({ length: bedInfo["CovidBed"].length }).map(
          (_, i) => (

            bedInfo["CovidBed"][`${i}`]["IsOccupied"] != 1 ? (covidFree.push(bedInfo["CovidBed"][`${i}`]["BedID"])) : (null)

          )
        )

        Array.from({ length: bedInfo["NormalBed"].length }).map(
          (_, j) => (
            bedInfo["NormalBed"][`${j}`]["IsOccupied"] != 1 ? (normalFree.push(bedInfo["NormalBed"][`${j}`]["BedID"])) : (null)

          )
        )

        if (RATresult == "1" && covidFree.length > 0) {
          return covidFree[0];
        }
        else if (RATresult == "0" && normalFree.length > 0) {
          return normalFree[0];
        }

        else {
          return 'no'
        }
      }
    }
  };



  const [bedInfo, setBedInfo] = useState(null);

  //calculate the age of patient
  const getAge = bday => {
    if (Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10)) {
      return (Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10));
    }
    else {
      return Math.round(((new Date() - new Date(bday).getTime()) / 3.15576e+10 + Number.EPSILON) * 1000) / 1000;
    }
  };


  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();

  const admitDateTime = date + 'T' + time

  //Create IDs for the patients
  const id = contactnumber.toString() + Date.parse(bday1);
  const allocationId = id + Date.parse(new Date()) + "A";
  const reportId = id + Date.parse(new Date()) + "R";
  const testId = id + Date.parse(new Date()) + "T";
  const phonenumber = "+94" + contactnumber.toString();

  const age = getAge(bday1);

  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    try {
      if (value) {
        const day = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
        setBday2(day);
        setBday1(value.toISOString().slice(0, 10));
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

  const AppButton = ({ onPress, title, ...props }) => (
    <TouchableOpacity   {...props} onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {


      setName("");
      setBday1("");
      setAddress("");
      setContactnumber("");
      setBloodtype(" ");
      setDistrict("");
      setRATresult(" ");
      setBday2("");
      setGender("Male");
      setTypevaccinated(null);
      setNumvaccinated("0");
      setIsvaccinated("0");

      try {
        async function loadbeds() {

          const token = await AsyncStorage.getItem('token');

          const URL = `${BASE_URL}/bed/search/*`;
          try {
            let res = await fetch(URL, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },

            });
            response = await res.json()

            setBedInfo(response.results);


            if (res.status !== 200 && res.status !== 201 && res.status !== 202) {
              throw new Error(message);
            } else {
              if (response) {
                try {
                } catch (error) { }

              }
            }
          } catch (error) {

          }
        }
        loadbeds();

      } catch (error) {
        alert(" Try again (LOGOUT)!", [
          { text: "Okay" },
        ]);
      }


    });


  }, [bedInfo,]);




  const admit = async () => {
    const token = await AsyncStorage.getItem('token');
    const URL = `${BASE_URL}/patient/admit`;

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          id: id,
          age: age,
          gender: gender,
          address: address,
          contactnumber: phonenumber,
          bloodtype: bloodtype,
          district: district,
          testId: testId,
          isvaccinated: isvaccinated,
          RATresult: RATresult,
          medicalHistory: medicalHistory,
          reportId: reportId,
          bedId: bedId,
          allocationId: allocationId,
          admitDateTime: admitDateTime,
          bday: bday1,
          Type_vaccine: Type_vaccine,
          Num_vaccine: Num_vaccine,


        }),
      });

      const response = await res.json();
      const message = response["message"]

      if (res.status !== 200 && res.status !== 201 && res.status !== 202) {

        throw new Error(message);
      } else {

        setName("");
        setBday1("");
        setAddress("");
        setContactnumber("");
        setBloodtype(" ");
        setDistrict("");
        setRATresult(" ");
        setBday2("");
        setGender("Male");
        setTypevaccinated(null);
        setNumvaccinated("0");
        setIsvaccinated("0");


        if (response) {
          alert((message), [
            { text: "Okay" },
          ]);


        }
      }
    } catch (error) {

      alert((error.message.toString()), [
        { text: "Okay" },
      ]);
    }
  };

  const handleSubmitPress = () => {

    setBedId(getBedId(bedInfo))


    if (!name) {
      alert("Name can't be empty !");
      return;
    }
    if (!bday2) {
      alert("Date of Birthday can't be empty !");
      return;
    }
    if (!gender) {
      alert("Please select gender !");
      return;
    }
    if (!district || district == 'disabled') {
      alert("District can't be empty !");
      return;
    }
    if (!contactnumber) {
      alert("Contactnumber can't be empty !");
      return;
    }
    if (!bloodtype || bloodtype == 'disabled') {
      alert(" Please select BloodType  !");
      return;
    }


    if (!RATresult || RATresult == 'disabled') {
      alert("Please select RATresult !");
      return;
    }

    if (bedId == "") {
      alert("Press Again !");
      return;
    }

    admit();
  };

  return (
    <SafeAreaView style={styles.footer}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>ADMIT NEW PATIENT </Text>
        <View
          style={{
            borderBottomColor: "#009387",
            borderBottomWidth: 2,
          }}
        />
      </View>


      <ScrollView style={{ paddingRight: 20 }}>

        <Text style={styles.textFooter}>Patient Name</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter name"
            value={name}
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            testID="name_test"
            onChangeText={(name) => setName(name)}
          />
        </View>

        {isPickerShow && (
          <DateTimePicker
            value={new Date()}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            maximumDate={new Date()}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}

        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Text style={styles.textFooter}>Date of Birth</Text>
          <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>Gender</Text>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <View style={styles.action1} onPress={showPicker}>
            <FontAwesome name="calendar" size={15} onPress={showPicker} {...styles.icons} />
            <Text style={styles.pickedDate}>{bday2}</Text>
            <TextInput
              placeholder={bday2 ? "" : "Select Date"}
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              editable={false}


            />

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


        <Text style={[{ marginTop: 15, }, styles.textFooter]}>District</Text>
        <View style={styles.districtDrop}>
          <Picker
            style={styles.daction}
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


        <View style={styles.action3}>

          <PhoneInput
            defaultCode="LK"
            containerStyle={{
              width: 133,
              height: 30,
              marginTop: 1,
              alignSelf: 'center'
            }}
          />
          <TextInput
            placeholder="Enter Contact Number "
            value={contactnumber}
            keyboardType={'numeric'}
            placeholderTextColor="#666666"
            style={styles.textInput1}
            onChangeText={(contactnumber) => setContactnumber(contactnumber)}
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

          <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>RAT results</Text>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[{ flex: 0.5, }, styles.BloodDrop]}>
            <Picker
              style={styles.daction}
              onValueChange={setBloodtype}
              selectedValue={bloodtype}

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


          <View style={[{ flex: .5, }, styles.BloodDrop]}>
            <Picker
              style={styles.daction}

              onValueChange={setRATresult}
              selectedValue={RATresult}

            >
              <Picker.Item label="Select" value="disabled" color="#aaa" />
              <Picker.Item label="POSITIVE" value="1" />
              <Picker.Item label="NAGEATIVE" value="0" />
            </Picker>
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

        {"1" == isvaccinated ? (
          <>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Text style={styles.textFooter}>Vaccine Type</Text>
              <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>No.Vaccine</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={[{ flex: 0.5, }, styles.BloodDrop]}>
                <Picker
                  style={styles.daction}
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
                  style={styles.daction}
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



        <AppButton testID="admit" onPress={handleSubmitPress} title={"Admit"} />

      </ScrollView>

    </SafeAreaView >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  daction: {
    flexDirection: "row",
    margin: 10,
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




export default HospitalAdminAdmit;
