import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

function EnterTestResults ({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppButton onPress={() => navigation.navigate('Homepage')} title={'Log out'}/>
      </View>
    </SafeAreaView>
  );
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#009387',
    borderRadius: 50,
    alignItems: 'center'
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default EnterTestResults;