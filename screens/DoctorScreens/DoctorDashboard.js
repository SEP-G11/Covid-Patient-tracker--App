import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../dev.config";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import * as Animatable from "react-native-animatable";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { VictoryPie } from 'victory-native';


function DoctorDashboard({ navigation }) {


  const [bedInfo, setBedInfo] = useState(null);
  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);



  // const graphicData = [{ x: bedInfo["results"]["CovidBedFree"] }, { y: bedInfo["results"]["CovidBedUsed"] }];
  const graphicColor = ['red', '#1e90ff',];

  function handleSubmit1() {
    setShow1(!show1);
  };


  function handleSubmit2() {
    setShow2(!show2);
  };



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

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

            setBedInfo(response.results)


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
        loadbeds();

      } catch (error) {
        alert(" Try again!", [
          { text: "Okay" },
        ]);
      }


    });

  }, [bedInfo]);


  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View >
        <Text style={styles.buttonText}>{title}</Text>
        <View>

        </View>
      </View>
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

  return (


    bedInfo ? (


      <SafeAreaView style={styles.footer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}> DOCTOR  DASHBOARD</Text>
          <View
            style={{
              borderBottomColor: "#009387",
              borderBottomWidth: 2,
            }}
          >

            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <FontAwesome name="h-square" size={17}  {...styles.icons} />
              <Text style={styles.textFooter}>{bedInfo.FacilityName}</Text>
              <FontAwesome name="phone-square" size={17}  {...styles.icons1} />
              <Text style={{ color: "#007c7a", fontSize: 13, paddingLeft: 5 }}>{bedInfo.Contactnumber}</Text>
            </View>

          </View>
        </View>



        {(bedInfo["NormalBedUsed"]+bedInfo["CovidBedUsed"])/(bedInfo["NormalBedFree"]+bedInfo["CovidBedFree"]+bedInfo["NormalBedUsed"]+bedInfo["CovidBedUsed"])>0.75 ? 
                
        (

          <Animatable.View   animation='pulse'    iterationCount='infinite'>
          <View style={{ flexDirection: 'row', marginTop: 2, alignItems: "center", backgroundColor: "#ffe4e1" }}>
  
            <Text style={{ color: "red", }}>      <FontAwesome name="exclamation-triangle" size={15}  {...styles.icons2} /> WARNING: The hospital capacity is about to full !</Text>
  
          </View>
          </Animatable.View>

        ):
        (null)
      }
    


        

        <ScrollView style={{ paddingRight: 20 }}>

          {/* <View style={{ flexDirection: 'row', marginTop: 2 }}>

          <Text style={styles.textFooter1}>WELCOME</Text>
          <View style={{ flexDirection: 'row', marginTop: 2, marginRight: 0 }}>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
          </View>        
        </View> */}
          <Image style={styles.logo} source={require("../../assets/logo.png")} />

          <View
            style={{

              marginLeft: 15,
              marginBottom: 10,
              borderBottomColor: "#009387",
              borderBottomWidth: 2,
            }}
          />


          <View style={{ marginTop: 2 }}>
            <Text style={{ textAlign: "center", color: "#007c7a", fontSize: 30 }}>WELCOME</Text>
          </View>

          <View style={{ textAlign: "center", marginTop: 2 }}>

            <Text style={{ textAlign: "center", color: "#000", fontSize: 15 }}>Your are a  doctor of {bedInfo.FacilityName}.Try to work with your best.</Text>

          </View>


          <View style={{ alignItems: "center", marginRight: 0 }}>
            <AppButton
              onPress={() => navigation.navigate("DoctorAdmit")}
              title={"GET START"}
            />
          </View>



          <View
            style={{

              marginLeft: 15,
              marginBottom: 10,
              borderBottomColor: "#009387",
              borderBottomWidth: 2,
            }}
          />



          {/* <Text style={styles.textFooter1}>WELCOME</Text> */}
          <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
            <Title style={{ textAlign: "center", marginTop: 0, fontSize: 15, color: "#007c7a" }}>Covid Beds </Title>
            <VictoryPie data={[{ x: "Used " + `${(bedInfo["CovidBedUsed"] / (bedInfo["CovidBedUsed"] + bedInfo["CovidBedFree"])) * 100}` + "%", y: bedInfo["CovidBedUsed"] }, { x: "Free " + `${(bedInfo["CovidBedFree"] / (bedInfo["CovidBedUsed"] + bedInfo["CovidBedFree"])) * 100}` + "%", y: bedInfo["CovidBedFree"] },]} width={300} height={150} colorScale={graphicColor} innerRadius={50} />


          </View>

          <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
            <Title style={{ textAlign: "center", marginTop: 0, fontSize: 15, color: "#007c7a" }}>Normal Beds </Title>
            <VictoryPie data={[{ x: "Used " + `${(bedInfo["NormalBedUsed"] / (bedInfo["NormalBedUsed"] + bedInfo["NormalBedFree"])) * 100}` + "%", y: bedInfo["NormalBedUsed"] }, { x: "Free " + `${(bedInfo["NormalBedFree"] / (bedInfo["NormalBedUsed"] + bedInfo["NormalBedFree"])) * 100}` + "%", y: bedInfo["NormalBedFree"] },]} width={300} height={150} colorScale={graphicColor} innerRadius={50} />


          </View>

          <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
            <Title style={{ textAlign: "center", marginTop: 0, fontSize: 15, color: "#007c7a", }}>Total Beds </Title>

            <VictoryPie data={[{ x: "Used " + `${((bedInfo["CovidBedUsed"] + bedInfo["NormalBedUsed"]) / (bedInfo["CovidBedUsed"] + bedInfo["CovidBedFree"] + bedInfo["NormalBedUsed"] + bedInfo["NormalBedFree"])) * 100}` + "%", y: (bedInfo["CovidBedUsed"] + bedInfo["NormalBedUsed"]) }, { x: "Free " + `${((bedInfo["CovidBedFree"] + bedInfo["NormalBedFree"]) / ((bedInfo["CovidBedUsed"] + bedInfo["CovidBedFree"] + bedInfo["NormalBedUsed"] + bedInfo["NormalBedFree"]))) * 100}` + "%", y: (bedInfo["CovidBedFree"] + bedInfo["NormalBedFree"]) },]} width={300} height={150} colorScale={graphicColor} innerRadius={50} />



          </View>


          <View
            style={{

              marginLeft: 5,
              marginBottom: 20,
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
                          <Paragraph key={i} style={{ color: "red", textAlign: "center" }}>{bedInfo["CovidBed"][`${i}`]["BedID"]}    {bedInfo["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : (" Free")}</Paragraph>
                        ) :
                          (<Paragraph key={i} style={{ color: "green", textAlign: "center" }}>{bedInfo["CovidBed"][`${i}`]["BedID"]} {bedInfo["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : (" Free")}</Paragraph>)


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
                          <Paragraph key={i} style={{ color: "red", textAlign: "center" }}>{bedInfo["NormalBed"][`${i}`]["BedID"]}    {bedInfo["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : (" Free")}</Paragraph>
                        ) :
                          (<Paragraph key={i} style={{ color: "green", textAlign: "center" }}>{bedInfo["NormalBed"][`${i}`]["BedID"]} {bedInfo["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : (" Free")}</Paragraph>)


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







        </ScrollView>
      </SafeAreaView >


    ) : (null)



  )


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
    fontSize: 25,
    textAlign: "center"
  },
  textFooter: {
    color: "#007c7a",
    fontSize: 13,
    paddingLeft: 5,
    marginRight: 40
  },
  textFooter1: {
    color: "#007c7a",
    fontSize: 30,

    paddingLeft: 15,
    marginTop: 20
  },
  textFooter2: {
    color: "#000",
    fontSize: 14,

    marginTop: 2
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
    paddingRight: 10

  },
  icons1: {
    color: "#007c7a",
    marginLeft: 30,
    paddingLeft: 20

  },

  icons2: {
    color: "red",


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


  logo: {
    width: 300,
    alignItems: "center",
    height: 70,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10

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


export default DoctorDashboard;
