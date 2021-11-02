import React from "react";
import HospitalAdminSearchBeds from "../../screens/HospitalAdminScreens/HospitalAdminSearchBeds";
import { act, create } from "react-test-renderer";
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';

jest.useFakeTimers();
const navigation = { addListener: jest.fn() }

afterEach(cleanup);

let tree
test('snapshot HA Search Beds Results page', async () => {  
    act(() => { tree = create(<HospitalAdminSearchBeds navigation={navigation} />) })   
        expect(tree).toMatchSnapshot();
    })

test('Facility empty input error massage', async () => {
    global.alert = jest.fn();
    const searchBtn = tree.root.findByProps({ testID: 'search' }).props;
    act(() => searchBtn.onPress());
    expect(global.alert).toHaveBeenCalledWith("Please select Facility !");
});

test('Test Result empty input error massage', async () => {
    global.alert = jest.fn();
    const  facility = tree.root.findByProps({ testID: 'facility_test' }).props;
    act(() => facility.onValueChange("National Hospital of Sri Lanka"));
    const searchBtn = tree.root.findByProps({ testID: 'search' }).props;
    act(() => searchBtn.onPress());
    act(() => expect(global.alert.length).toEqual(0));    

});

