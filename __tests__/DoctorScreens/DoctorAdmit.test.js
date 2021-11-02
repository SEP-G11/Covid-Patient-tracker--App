import React from "react";
import DoctorAdmit from "../../screens/DoctorScreens/DoctorAdmit";
import { act, create } from "react-test-renderer";
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';

jest.useFakeTimers();
const navigation = { addListener: jest.fn() }
afterEach(cleanup);
const isPickerShow = true;

let tree
test('snapshot Doctor Admit page', async () => {  
    act(() => { tree = create(<DoctorAdmit navigation={navigation} {...isPickerShow}/>) })   
        expect(tree).toMatchSnapshot();
    })


test('Name empty input error massage', async () => {
    global.alert = jest.fn();
    const admitBtn = tree.root.findByProps({ testID: 'admit' }).props;
    act(() => admitBtn.onPress());
    expect(global.alert).toHaveBeenCalledWith("Name can't be empty !");
});

test('Birth Day empty input error massage', async () => {
    global.alert = jest.fn();
    const name = tree.root.findByProps({ testID: 'name_test' }).props;
    act(() => name.onChangeText("Lahiu Nuraj"));

    const admitBtn = tree.root.findByProps({ testID: 'admit' }).props;
    act(() => admitBtn.onPress());

    expect(global.alert).toHaveBeenCalledWith("Date of Birthday can't be empty !");

});


// test('Contactnumber empty input error massage', async () => {
//     global.alert = jest.fn();
//     const name = tree.root.findByProps({ testID: 'name_test' }).props;
//     act(() => name.onChangeText("Lahiu Nuraj"));

//     const bday = tree.root.findByProps({ testID: 'bday_test' }).props;

//     act(() => bday.onChange(new Date() ));

//     const admitBtn = tree.root.findByProps({ testID: 'admit' }).props;
//     act(() => admitBtn.onPress());

//     expect(global.alert).toHaveBeenCalledWith("Contactnumber can't be empty !");

// });

// test('District empty input error massage', async () => {
//     global.alert = jest.fn();
//     const name = tree.root.findByProps({ testID: 'name_test' }).props;
//     act(() => name.onChangeText("Lahiu Nuraj"));

//     const bday = tree.root.findByProps({ testID: 'bday_test' }).props;
//     act(() => bday.onChangeText("2011-01-11"));

//     const phone = tree.root.findByProps({ testID: 'phone_test' }).props;
//     act(() => phone.onChangeText("0710158123"));

//     const admitBtn = tree.root.findByProps({ testID: 'admit' }).props;
//     act(() => admitBtn.onPress());

//     expect(global.alert).toHaveBeenCalledWith("District can't be empty !");

// });


// test('District empty input error massage', async () => {
//     global.alert = jest.fn();
//     const name = tree.root.findByProps({ testID: 'name_test' }).props;
//     act(() => name.onChangeText("Lahiu Nuraj"));

//     const bday = tree.root.findByProps({ testID: 'bday_test' }).props;
//     act(() => bday.onChangeText("2011-01-11"));

//     const phone = tree.root.findByProps({ testID: 'phone_test' }).props;
//     act(() => phone.onChangeText("0710158123"));

//     const district = tree.root.findByProps({ testID: 'district_test' }).props;
//     act(() => district.onChangeText("Matara"));

//     const admitBtn = tree.root.findByProps({ testID: 'admit' }).props;
//     act(() => admitBtn.onPress());

//     expect(global.alert).toHaveBeenCalledWith("Please select RATresult !");

// });




