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


function DoctorEditMedicalReport({ navigation ,route }) {
    const [patientId, setPatientId] = useState('')
    const [reportId, setReportId] = useState('')
    const [ward, setWard] = useState('')
    const [bedNo, setBedNo] = useState('')
    const [status, setStatus] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [description, setDescription] = useState('')
    const [admitted_at, setAdmittedAt] = useState('')
    const [isPickerShow, setIsPickerShow] = useState(false);

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChangeA = (event, value) => {
    try {
      if (value) {
        const day = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
        setAdmittedAt(value.toISOString().slice(0, 10));
      }

    }
    catch (e) {
      alert("Selected Day is Erroried !")

    }

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    );

    const updatePatientReport = async (report) => {
        const token = await AsyncStorage.getItem('token');
        const URL = `${BASE_URL}/report/updateReport/${report.patient_id}`;
        try {
            const res = await fetch(URL, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(report),
            });

            const response = await res.json();

            setStatus(response.status);
            setSymptoms(response.symptoms);
            setDescription(response.description);
            setAdmittedAt(response.admitted_at);

            if (response){
                navigation.navigate('DoctorViewMedicalReport',{ id: `${report.patient_id}` })
            }

        } catch (error) {
            alert((error.message.toString()), [
                { text: "Okay" },
            ]);
        }
    };


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
            setPatientId(response.patient_id)
            setReportId(response.report_id)
            setWard(response.ward)
            setBedNo(response.bed_no)
            setStatus(response.status);
            setSymptoms(response.symptoms);
            setDescription(response.description);
            setAdmittedAt(response.admitted_at);

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

    const handleSubmitPress = () => {
        updatePatientReport({ report_id:reportId , patient_id:patientId, symptoms, admitted_at, description, status });
    };

    return (
        <SafeAreaView style={styles.footer}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>EDIT MEDICAL REPORT</Text>
                <View
                    style={{
                        borderBottomColor: "#009387",
                        borderBottomWidth: 2,
                    }}
                />
            </View>


            <ScrollView style={{ paddingRight: 20 }}>

            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{margin: 10,fontSize: 18}}>
                    Patient Id: {patientId}
                </Text>
                </View>

                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{margin: 10,fontSize: 18}}>
                    Report Id: {reportId}
                </Text>
                </View>

                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{margin: 10,fontSize: 18}}>
                    Ward: {ward}
                </Text>
                </View>

                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{margin: 10,fontSize: 18}}>
                    Bed No: {bedNo}
                </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Text style={styles.textFooter}>Status</Text>
                    <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>Symptoms</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[{ flex: .5, }, styles.BloodDrop]}>
                        <Picker
                            style={styles.action}
                            onValueChange={setStatus}
                            selectedValue={status}

                        >
                            <Picker.Item label="Select" value="disabled" color="#aaa" />
                            <Picker.Item label="Active" value="Active" />
                            <Picker.Item label="Dead" value="Dead" />
                            <Picker.Item label="Recovered" value="Recovered" />
                        </Picker>
                    </View>

                    <View style={[{ flex: .5, }, styles.BloodDrop]}>
                        <TextInput
                            placeholder="Enter Symptoms"
                            value={symptoms}
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(symptoms) => setSymptoms(symptoms)}
                        />
                    </View>

                </View>
                <Text style={[styles.textFooter, { marginTop: 15 }]}>Medical History</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter Medical History"
                        placeholderTextColor="#666666"
                        value={description}
                        multiline={true}
                        numberOfLines={3}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(description) => setDescription(description)}
                    />

                </View>


                {isPickerShow && (
                    <DateTimePicker
                        value={new Date()}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        // format="YYYY-MM-DD"
                        maximumDate={new Date()}
                        onChange={onChangeA}
                        style={styles.datePicker}
                    />
                )}

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Text style={styles.textFooter}>Admitted Date</Text>
                    {/* <Text style={{ color: "#007c7a", fontSize: 16, paddingLeft: 100 }}>Gender</Text> */}
                </View>

                <View style={styles.action1} onPress={showPicker}>
                    <FontAwesome name="calendar" size={15} onPress={showPicker} {...styles.icons} />
                    <Text style={styles.pickedDate}>{admitted_at}</Text>
                    <TextInput
                        placeholder={admitted_at ? "" : "Select Date"}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        editable={false}
                    />
                </View>


                <AppButton onPress={handleSubmitPress} title={'Save Changes'}/>

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





export default DoctorEditMedicalReport;
