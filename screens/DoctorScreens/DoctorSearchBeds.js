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
import { Card, Title, Paragraph } from 'react-native-paper';

function DoctorSearchBeds({ navigation }) {


  const [facilityId, setFacility] = useState("");
  const [bedInfo, setBedInfo] = useState(null);
  const [facilityInfo, setFacilityInfo] = useState(null);
  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);


  function handleSubmit1() {
    setShow1(!show1);
  };


  function handleSubmit2() {
    setShow2(!show2);
  };


  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>

  );


  const AppButton1 = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button1}>
      <View >
        <Text style={styles.buttonText1}>{title}</Text>
        <View>

        </View>
      </View>
    </TouchableOpacity>
  );


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFacility("");
      setBedInfo(null);

      try {
        async function loadFacilitys() {

          const token = await AsyncStorage.getItem('token');

          const URL = `${BASE_URL}/facility/getAllFacility`;
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

            setFacilityInfo(response.results)


            if (res.status !== 200 && res.status !== 201 && res.status !== 202) {
              throw new Error(message);
            } else {
              if (response) {
                try {
                } catch (error) { }

              }
            }
          } catch (error) {
            // alert(" Can't  Load beds details", [
            //   { text: "Okay" },
            // ]);
          }
        }
        loadFacilitys();

      } catch (error) {
        alert(" Try again!", [
          { text: "Okay" },
        ]);
      }


    });

  }, [facilityInfo]);


  const search = async () => {
    const token = await AsyncStorage.getItem('token');
    const URL = `${BASE_URL}/bed/search/${facilityId}`;


    try {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      });

      const response1 = await res.json()




      const message = response1["message"]

      if (res.status !== 200 && res.status !== 201 && res.status !== 202) {

        throw new Error(message);
      } else {
        setBedInfo(response1.results)
        


        if (response1) {
          alert((message), [
            { text: "Okay" },
          ]);


        }
      }
    } catch (error) {

      setBedInfo(null);


      alert((error.message.toString()), [
        { text: "Okay" },
      ]);
    }
  };

  const handleSubmitPress = () => {



    if (!facilityId || facilityId == 'disabled') {
      alert("Please select Facility !");
      return;
    }

    search();
  };

  return (
    <SafeAreaView style={styles.footer}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>SEARCH  BEDS</Text>
        <View
          style={{
            borderBottomColor: "#009387",
            borderBottomWidth: 2,
          }}
        />
      </View>


      <ScrollView style={{ paddingRight: 20, marginTop: 50 }}>

        <Text style={styles.textFooter}>Facility Name</Text>
        <View style={[{ flex: .5, }, styles.BloodDrop]}>
          <Picker
            style={styles.action}
            onValueChange={setFacility}
            selectedValue={facilityId}

          >
            <Picker.Item label="Select" value="disabled" color="#aaa" />
            {facilityInfo ? (


              Array.from({ length: facilityInfo.length }).map(
                (_, j) => (
                  <Picker.Item key={j} label={facilityInfo[`${j}`]["name"]} value={facilityInfo[`${j}`]["facility_id"]} />

                )
              )

            )
              :
              (null)}




          </Picker>

        </View>




        <AppButton onPress={handleSubmitPress} title={"Search"} />






        {bedInfo ? (


          <SafeAreaView style={styles.footer}>



            <View
              style={{

                marginLeft: 2,
                marginBottom: 10,
                borderBottomColor: "#009387",
                borderBottomWidth: 2,
              }}
            />







            <View style={{ flexDirection: 'row', marginTop: 2 }}>

              {/* <Text style={styles.textFooter1}>WELCOME</Text> */}
              <View style={{ flex: .5 }}>


                <Card style={{ borderColor: "#007c7a", borderWidth: 3, borderRadius: 5, textAlign: "center" }}>
                  {/* <Card.Title title="Covid Ward" subtitle="Card Subtitle"  /> */}
                  <Card.Content>
                    <Title style={{ textAlign: "center", marginTop: 0 }}>Covid Ward </Title>

                    <View
                      style={{
                        borderBottomColor: "#009387",
                        borderBottomWidth: 2,
                      }}
                    />
                    <Title style={{ textAlign: "center", marginTop: 0, fontSize: 15 }}>Total Beds : {bedInfo.CovidWardCapacity}</Title>
                    <Title style={{ textAlign: "center", marginTop: 0, fontSize: 16, color: "grey" }}>Used  :{bedInfo["CovidBedUsed"]} Free : {bedInfo["CovidBedFree"]}</Title>
                    <View>

                      <AppButton1
                        onPress={handleSubmit1}
                        title={"more"}
                      />

                    </View>

                    {show1 ? (


                      Array.from({ length: bedInfo.CovidBed.length }).map(
                        (_, i) => (

                          bedInfo["CovidBed"][`${i}`]["IsOccupied"] == 1 ? (
                            <Paragraph key={i} style={{ color: "red", textAlign: "center" }}>{bedInfo["CovidBed"][`${i}`]["BedID"]}    {bedInfo["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Free")}</Paragraph>
                          ) :
                            (<Paragraph key={i} style={{ color: "green", textAlign: "center" }}>{bedInfo["CovidBed"][`${i}`]["BedID"]} {bedInfo["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Free")}</Paragraph>)


                        )
                      )

                    )
                      :
                      (null)}



                  </Card.Content>


                  {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                  <Card.Actions>
                    {/* <Button>Cancel</Button>
<Button>Ok</Button> */}
                  </Card.Actions>
                </Card>
              </View>


              <View style={{ flex: .5, marginLeft: 15 }}>
                <Card style={{ borderColor: "#007c7a", borderWidth: 3, borderRadius: 5, textAlign: "center" }}>
                  {/* <Card.Title title="Covid Ward" subtitle="Card Subtitle"  /> */}
                  <Card.Content>
                    <Title style={{ textAlign: "center", marginTop: 0 }}>Normal Ward </Title>

                    <View
                      style={{
                        borderBottomColor: "#009387",
                        borderBottomWidth: 2,
                      }}
                    />
                    <Title style={{ textAlign: "center", marginTop: 0, fontSize: 15 }}>Total Beds : {bedInfo.NormalWardCapacity}</Title>
                    <Title style={{ textAlign: "center", marginTop: 0, fontSize: 16, color: "grey" }}>Used  :{bedInfo["NormalBedUsed"]} Free : {bedInfo["NormalBedFree"]}</Title>
                    <View>

                      <AppButton1
                        onPress={handleSubmit2}
                        title={"more"}
                      />

                    </View>

                    {show2 ? (


                      Array.from({ length: bedInfo.NormalBed.length }).map(
                        (_, i) => (

                          bedInfo["NormalBed"][`${i}`]["IsOccupied"] == 1 ? (
                            <Paragraph key={i} style={{ color: "red", textAlign: "center" }}>{bedInfo["NormalBed"][`${i}`]["BedID"]}    {bedInfo["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Free")}</Paragraph>
                          ) :
                            (<Paragraph key={i} style={{ color: "green", textAlign: "center" }}>{bedInfo["NormalBed"][`${i}`]["BedID"]} {bedInfo["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Free")}</Paragraph>)


                        )
                      )

                    )
                      :
                      (null)}



                  </Card.Content>


                  {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                  <Card.Actions>
                    {/* <Button>Cancel</Button>
<Button>Ok</Button> */}
                  </Card.Actions>
                </Card>
              </View>

            </View>



          </SafeAreaView >

        ) : (null)






        }





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
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#009387",
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#20d1ce",
    borderWidth: 2,

  },
  button1: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: "#009387",
    borderRadius: 15,
    alignItems: "center",
    borderColor: "#20d1ce",
    borderWidth: 2,

  },
  buttonText: {
    color: "#fff",
    fontSize: 20,

  },
  buttonText1: {
    color: "#fff",
    fontSize: 14,

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




export default DoctorSearchBeds;
