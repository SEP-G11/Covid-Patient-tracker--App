import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from "react-native";

function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const [data, setData] = React.useState({
    secureTextEntry: true,
    isValidUser: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const signIn = async () => {
    const URL = "http://192.168.8.102:8001/auth/login";

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const response = await res.json();

      // console.log(response.results);

      if (res.status != 200) {
        throw new Error();
      } else {
        if (response.results.token) {
          try {
            await AsyncStorage.setItem("userInfo", JSON.stringify(response));
          } catch (error) {}

          if (response.results.accType === "DOC") {
            navigation.navigate("DoctorDashboard");
          } else {
            navigation.navigate("HospitalAdminDashboard");
          }
        }
      }
    } catch (error) {
      alert("Invalid User!", "email or password is incorrect.", [
        { text: "Okay" },
      ]);
    }
  };

  const handleSubmitPress = () => {
    setErrortext("");
    if (!email) {
      alert("Email can't be empty !");
      return;
    }
    if (!password) {
      alert("Password can't be empty !");
      return;
    }
    signIn();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.textFooter}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-square" size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <Text style={[styles.textFooter, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
          />

          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 30 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <AppButton onPress={handleSubmitPress} title={"Sign In"} />
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  textHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textFooter: {
    color: "#000",
    fontSize: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
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
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    marginTop: 100,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#009387",
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Signin;
