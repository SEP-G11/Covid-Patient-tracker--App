import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';

function DoctorViewPatientList ({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ReactFlexyTable sortable filterable caseSensitive>
          <thead>
            <tr>
                <th className="text-center table-head">Patient Id</th>
                <th className="text-center table-head">Name</th>
                <th className="text-center table-head">Patient Information</th>
                <th className="text-center table-head">Medical Report</th>
            </tr>
          </thead>
          <tbody className="text-dark">
          <tr>
                <td className="text-center">1</td>
                <td className="text-center">2</td>
            </tr>
            ))}
        </tbody>
        </ReactFlexyTable>
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

export default DoctorViewPatientList;