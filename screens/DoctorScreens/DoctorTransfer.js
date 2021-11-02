import React, { useState, useEffect, useRef } from "react";
import {BASE_URL} from "../../dev.config";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView, 
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

function DoctorTransfer({ navigation ,route}) {

  const [id, setId] = useState(route.params.id =="" ? (""):(route.params.id));
  const [dest_bed_id, setDes] = useState("");


var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();
  const DateTime = date + 'T' + time;


   const AppButton = ({ onPress, title, ...props }) => (
    <TouchableOpacity   {...props} onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDes("");   

    });
  }, [navigation,]);



  const transfer = async () => {
    const token = await AsyncStorage.getItem('token');

    const URL = `${BASE_URL}/patient/transfer`;


    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
       
             patient_id:id,          
             dest_bed_id:dest_bed_id,
             transfer_date:DateTime

        }),
      });

      const response = await res.json();
      const message = response["message"]

      if (res.status !== 200 && res.status !== 201 && res.status !== 202) {

        throw new Error(message);
      } else {

        setId("");  
        setOrigin("");       
        setDes("");
  
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


    if (!id) {
      alert("Id can't be empty !");
      return;
    }

         if (!dest_bed_id || dest_bed_id == 'disabled') {

    
        alert("Please select Destination BedID !");
        return;
      }
          transfer(); 

  };

  return (
    <SafeAreaView style={styles.footer}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>TRANSFER  PATIENT </Text>
        <View
          style={{
            borderBottomColor: "#009387",
            borderBottomWidth: 2,
          }}
        />
      </View>


      <ScrollView style={{ paddingRight: 20 ,marginTop:50}}>

        <Text style={styles.textFooter}>Patient ID</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Id"
            value={id}
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            testID='id_test'
            onChangeText={(id) => setId(id)}
          />
        </View>       

        <Text style={styles.textFooter1}>Destination Bed Id</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Destination Bed Id"
            value={dest_bed_id}
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType={'numeric'}
            testID='dest_test'
            onChangeText={(dest_bed_id) => setDes(dest_bed_id)}
          />
        </View>

        <AppButton testID="transfer" onPress={handleSubmitPress} title={"Transfer"} />

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

  textFooter1: {
    color: "#007c7a",
    fontSize: 16,
    paddingTop:15,
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




export default DoctorTransfer;
