import React from "react";
import DoctorEnterResults from "../../screens/DoctorScreens/DoctorEnterResults";
import { act, create } from "react-test-renderer";
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';

jest.useFakeTimers();
const navigation = { addListener: jest.fn() }
const route = { params:{id:""} }
afterEach(cleanup);

let tree
test('snapshot Doctor Enter Results page', async () => {  
    act(() => { tree = create(<DoctorEnterResults navigation={navigation} route={route}/>) })   
        expect(tree).toMatchSnapshot();
    })

test('Id empty input error massage', async () => {
    global.alert = jest.fn();
    const enterBtn = tree.root.findByProps({ testID: 'enter' }).props;
    act(() => enterBtn.onPress());
    expect(global.alert).toHaveBeenCalledWith("Id can't be empty !");
});

test('Test Result empty input error massage', async () => {
    global.alert = jest.fn();
    const id = tree.root.findByProps({ testID: 'id_test' }).props;
    act(() => id.onChangeText("12636353574430220"));

    const enterBtn = tree.root.findByProps({ testID: 'enter' }).props;
    act(() => enterBtn.onPress());

    expect(global.alert).toHaveBeenCalledWith("Please select Test Result !");

});

test('Test Result empty input error massage', async () => {
    global.alert = jest.fn();
    const id = tree.root.findByProps({ testID: 'id_test' }).props;
    act(() => id.onChangeText("12636353574430220"));

    const result = tree.root.findByProps({ testID: 'result_test' }).props;
    act(() => result.onValueChange("POSITIVE"));

    const enterBtn = tree.root.findByProps({ testID: 'enter' }).props;
    act(() => enterBtn.onPress());

    expect(global.alert).toHaveBeenCalledWith("Please select Test Type !");

});

test('Successfully Enter results', async () => {
    global.alert = jest.fn();
    const id = tree.root.findByProps({ testID: 'id_test' }).props;
    act(() => id.onChangeText("12636353574430220"));

    const result = tree.root.findByProps({ testID: 'result_test' }).props;
    act(() => result.onValueChange("POSITIVE"));

    const type = tree.root.findByProps({ testID: 'type_test' }).props;
    act(() => type.onValueChange("PCR"));

    const enterBtn = tree.root.findByProps({ testID: 'enter' }).props;
    act(() => enterBtn.onPress());

    expect(global.alert.length).toEqual(0);

});