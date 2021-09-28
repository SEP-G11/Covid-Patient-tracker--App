import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Homepage({ navigation }) {




  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.header}>

        <Image style={styles.logo} source={require("../assets/logo.png")} />

      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay Safe  SriLanka !</Text>

        <Animatable.View
          animation='pulse'
          iterationCount='infinite'
        >
          <AppButton
            onPress={() => navigation.navigate("Signin")}
            title={"Get Started"}
          />

        </Animatable.View>

      </Animatable.View>
    </SafeAreaView>
  );
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <View style={styles.action}>
      <Text style={styles.buttonText}>{title}</Text>
      <View>

      </View>


    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 150,
    marginTop: 150,
    marginBottom: 120,
  },
  footer: {
    flex: 1,
    backgroundColor: "#009387",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 70,
    paddingHorizontal: 40,
  },
  action: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    paddingBottom: 65,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "flex-end",
    shadowColor: "#fff",
    shadowOpacity: 80,
    shadowRadius: 2,
    elevation: 12,
    borderRadius: 10,
    borderColor: "#20d1ce",
    borderWidth: 3,
  },
  buttonText: {
    color: "#009387",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Homepage;
