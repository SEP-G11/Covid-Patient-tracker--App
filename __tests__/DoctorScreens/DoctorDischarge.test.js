import React from "react";
import DoctorDischarge from "../../screens/DoctorScreens/DoctorDischarge";
import { act, create } from "react-test-renderer";
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';

jest.useFakeTimers();
const navigation = { addListener: jest.fn() }
const route = { params: { id: "" } }
afterEach(cleanup);

let tree
test('snapshot Doctor Discharge page', async () => {
    act(() => { tree = create(<DoctorDischarge navigation={navigation} route={route} />) })
    expect(tree).toMatchSnapshot();
})

test('Id empty input error massage', async () => {
    global.alert = jest.fn();
    const dischargeBtn = tree.root.findByProps({ testID: 'discharge' }).props;
    act(() => dischargeBtn.onPress());
    expect(global.alert).toHaveBeenCalledWith("Id can't be empty !");
});

test('Status empty input error massage', async () => {
    global.alert = jest.fn();
    const id = tree.root.findByProps({ testID: 'id_test' }).props;
    act(() => id.onChangeText("12636353574430220"));
    const dischargeBtn = tree.root.findByProps({ testID: 'discharge' }).props;
    act(() => dischargeBtn.onPress());
    expect(global.alert).toHaveBeenCalledWith("Status can't be empty !");
});

test('Successfully Enter results', async () => {
    global.alert = jest.fn();
    const id = tree.root.findByProps({ testID: 'id_test' }).props;
    act(() => id.onChangeText("12636353574430220"));

    const status = tree.root.findByProps({ testID: 'status_test' }).props;
    act(() => status.onValueChange("Dead"));
   
    const enterBtn = tree.root.findByProps({ testID: 'discharge' }).props;
    act(() => enterBtn.onPress());

    expect(global.alert.length).toEqual(0);

});