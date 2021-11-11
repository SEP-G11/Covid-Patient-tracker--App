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
import { Table, TableWrapper, Row } from 'react-native-table-component';

function DoctorViewMedicalReport({ navigation ,route }) {

    const [report, setReport] = useState({});
    const [tests, setTests] = useState([]);

    var tableHead= ['TEST ID', 'DATE', 'TEST','RESULT'];
    var widthArr = [100, 100, 100, 100];

    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    );


 const convert = (result) => {
        if (result=='true'){
            return "Positive"
        }else{
            return "Negative"
        }
    }
    const getdate = (date) => {
        date = new Date(date)
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        let hr = date.getHours();
        let min = date.getMinutes(0);
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if ( hr<12 ) {
            if ( min <10 ) {
                min = '0' + min 
            } 
            min = min + "AM"     
        } else {
            if ( min <10 ) {
                min = '0' + min 
            } 
            min = min + "PM" 
        }
        return (year+'-' + month + '-'+dt+ " "+hr+"."+min)
    }

    const tableData = [];
    for (let i = 0; i < tests.length; i += 1) {
        const rowData = [];

        rowData.push(tests[i].test_id);
        rowData.push(getdate(tests[i].date));
        rowData.push(tests[i].test_type);
        rowData.push(convert(tests.result));

        tableData.push(rowData);
    }

    const getPatientReportDetails = async (id) => {
        const token = await AsyncStorage.getItem('token');
        const URL = `${BASE_URL}/report/patientReportDetails/${id}`;
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

            setReport(response);

        } catch (error) {
            alert((error.message.toString()), [
                { text: "Okay" },
            ]);
        }
    };

    const getPatientTestDetails = async (id) => {
        const token = await AsyncStorage.getItem('token');
        const URL = `${BASE_URL}/test/testDetails/${id}`;
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

            setTests(response);

        } catch (error) {
            alert((error.message.toString()), [
                { text: "Okay" },
            ]);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPatientReportDetails(route.params.id);
        });
    }, [navigation,route]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPatientTestDetails(route.params.id);
        });
    }, [navigation,route]);

    return (
        <SafeAreaView style={styles.footer}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>MEDICAL REPORT</Text>
                <View
                    style={{
                        borderBottomColor: "#009387",
                        borderBottomWidth: 2,
                    }}
                />
            </View>
            <ScrollView  horizontal={true}>

            <ScrollView style={{ paddingRight: 20 }}>


                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Report Id: {report.report_id}
                    </Text>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Patient Id: {report.patient_id}
                    </Text>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Bed No: {report.bed_no}
                    </Text>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Ward No: {report.ward}
                    </Text>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Symptoms: {report.symptoms}
                    </Text>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Status: {report.status}
                    </Text>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Medical History: {report.description}
                    </Text>
                    <Text style={{margin: 10,fontSize: 18}}>
                        Admitted At: {getdate(report.admitted_at)}
                    </Text>
                </View>


            <View style={styles.header}>
                <Text style={styles.textHeader}>TEST RESULTS</Text>
                <View
                    style={{
                        borderBottomColor: "#009387",
                        borderBottomWidth: 2,
                    }}
                />
            </View>
                {tests ? (
                        <View style={styles.container}>
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




                <AppButton onPress={() => navigation.navigate('DoctorViewPatientList')} title={'Back'}/>
                <AppButton onPress={() => navigation.navigate('DoctorEditMedicalReport',{ id: `${report.patient_id}` })} title={'Update'}/>
                </ScrollView>

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
        marginTop: 10,
        marginBottom: 10,
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





export default DoctorViewMedicalReport;
