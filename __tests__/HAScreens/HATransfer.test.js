import React from "react";
import HospitalAdminTransfer from "../../screens/HospitalAdminScreens/HospitalAdminTransfer";
import { act, create } from "react-test-renderer";
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';

jest.useFakeTimers();
const navigation = { addListener: jest.fn() }
const route = { params: { id: "" } }
afterEach(cleanup);

let tree
test('snapshot HA Transfer page', async () => {
    act(() => { tree = create(<HospitalAdminTransfer navigation={navigation} route={route} />) })
    expect(tree).toMatchSnapshot();
})

test('Id empty input error massage', async () => {
    global.alert = jest.fn();
    const transferBtn = tree.root.findByProps({ testID: 'transfer' }).props;
    act(() => transferBtn.onPress());
    expect(global.alert).toHaveBeenCalledWith("Id can't be empty !");
});

test('Destination empty input error massage', async () => {
    global.alert = jest.fn();
    const id = tree.root.findByProps({ testID: 'id_test' }).props;
    act(() => id.onChangeText("12636353574430220"));
    const transferBtn = tree.root.findByProps({ testID: 'transfer' }).props;
    act(() => transferBtn.onPress());
    expect(global.alert).toHaveBeenCalledWith("Please select Destination BedID !");
});


test('Successfully Transfer', async () => {
    global.alert = jest.fn();
    const id = tree.root.findByProps({ testID: 'id_test' }).props;
    act(() => id.onChangeText("12636353574430220"));

    const dest = tree.root.findByProps({ testID: 'dest_test' }).props;
    act(() => dest.onChangeText("12"));

    const transferBtn = tree.root.findByProps({ testID: 'transfer' }).props;
    act(() => transferBtn.onPress());
    expect(global.alert.length).toEqual(0);
});
