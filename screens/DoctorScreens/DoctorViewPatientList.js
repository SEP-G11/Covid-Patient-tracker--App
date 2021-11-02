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
import { Table, TableWrapper, Row } from 'react-native-table-component';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

function DoctorViewPatientList({ navigation }) {

    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [input, setInput] = useState('')
    var tableHead= ['PATIENT ID', 'NAME', 'PATIENT INFORMATION','MEDICAL REPORT','DISCHARGE','TRANSFER','RESULT'];
    var widthArr = [200, 100, 100, 100,100,100,100];


    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    );

    const tableData = [];
    for (let i = 0; i < patients.length; i += 1) {
        const rowData = [];

        rowData.push(patients[i].patient_id);
        rowData.push(patients[i].name);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorViewPatientInfo', { id: `${patients[i].patient_id}` })} title={'Information'} />);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorViewMedicalReport',{ id: `${patients[i].patient_id}` })} title={'Report'}/>);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorDischarge',{ id: `${patients[i].patient_id}` })} title={'Discharge'}/>);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorTransfer',{ id: `${patients[i].patient_id}` })} title={'Transfer'}/>);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorEnterResults',{ id: `${patients[i].patient_id}` })} title={'Result'}/>);

        tableData.push(rowData);
    }

    const filteredtableData = [];
    for (let i = 0; i < filteredPatients.length; i += 1) {
        const rowData = [];

        rowData.push(filteredPatients[i].patient_id);
        rowData.push(filteredPatients[i].name);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorViewPatientInfo', { id: `${filteredPatients[i].patient_id}` })} title={'Information'} />);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorViewMedicalReport',{ id: `${filteredPatients[i].patient_id}` })} title={'Report'}/>);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorDischarge',{ id: `${filteredPatients[i].patient_id}` })} title={'Discharge'}/>);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorTransfer',{ id: `${filteredPatients[i].patient_id}` })} title={'Transfer'}/>);
        rowData.push(<AppButton onPress={() => navigation.navigate('DoctorEnterResults',{ id: `${filteredPatients[i].patient_id}` })} title={'Result'}/>);

        filteredtableData.push(rowData);
    }

    const listPatients = async () => {
        const token = await AsyncStorage.getItem('token');
        const URL = `${BASE_URL}/patient/getPatients`;
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

            setPatients(response);

        } catch (error) {
            alert((error.message.toString()), [
                { text: "Okay" },
            ]);
        }
    };

    const filterPatients = async (input) => {
        const token = await AsyncStorage.getItem('token');
        const URL = `${BASE_URL}/patient/filterPatients/${input}`;
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
          
            setFilteredPatients(response);

        } catch (error) {
            alert((error.message.toString()), [
                { text: "Okay" },
            ]);
        }
    };


    const myFunction = (input) => {
        filterPatients(input);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            listPatients();
        });
    }, [navigation,]);



    return (
        <SafeAreaView style={styles.footer}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>PATIENTS LIST</Text>
                <View
                    style={{
                        borderBottomColor: "#009387",
                        borderBottomWidth: 2,
                    }}
                />
            </View>

            <ScrollView style={styles.dataWrapper1}>
                <Text style={styles.textFooter}>Search</Text>
                <View style={[{ marginBottom: 15 },styles.action]}>
                    <TextInput
                        value={input}
                        placeholder="Search for patients.."
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(input) => setInput(input)}
                    />
                    <AppButton onPress={() => myFunction(input) } title={'Search'} />
                </View>

                {filteredPatients ? (
                    <View style={styles.container}>
                        <ScrollView horizontal={true}  >
                            <View>
                                <ScrollView style={styles.dataWrapper1}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        {
                                            filteredtableData.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={widthArr}
                                                    style={[styles.row1, index%2 && {backgroundColor: '#dcdcdc'}]}
                                                    textStyle={styles.text2}
                                                />
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                )
                :(null)
            }

            {patients ? (
                    <View style={[{ marginTop: 15 },styles.container]}>
                        <ScrollView horizontal={true}  >
                            <View>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={tableHead} widthArr={widthArr} style={styles.header1} textStyle={styles.text1}/>
                                </Table>
                                <ScrollView style={styles.dataWrapper1}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        {
                                            tableData.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={widthArr}
                                                    style={[styles.row1, index%2 && {backgroundColor: '#dcdcdc'}]}
                                                    textStyle={styles.text2}
                                                />
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                )
                :(null)
            }
            </ScrollView>
        </SafeAreaView >
    );
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header1: { height: 50, backgroundColor: '#000' },
    text1: { textAlign: 'center', fontWeight: '100' ,color:'#fff'},
    text2: { textAlign: 'center', fontWeight: '100' ,color:'#000'},
    dataWrapper1: { marginTop: -1 },
    row1: { height: 40, backgroundColor: '#fff' },

    header: {
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    tableHeader: {
        textAlign: 'center',
    },
    tableHeading: {
        fontSize: 15,
        alignSelf: 'center'
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
        backgroundColor: "#009387",
        alignItems: "center",
        borderColor: "#20d1ce",
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 1,
        margin:5,
        borderWidth: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
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




export default DoctorViewPatientList;