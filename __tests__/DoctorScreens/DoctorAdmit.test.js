// import React from "react";
// import DoctorAdmit from "../../screens/DoctorScreens/DoctorAdmit";
// import { act, create } from "react-test-renderer";
// import { render, fireEvent } from '@testing-library/react-native';

// jest.useFakeTimers();
// const navigation = { navigate: jest.fn() }
// const tree = create(<DoctorAdmit navigation={navigation} />);

// test('snapshot Doctor Admit page ', async () => {
//     expect(tree).toMatchSnapshot();
// });

// test('Name empty input error massage', async () => {
//     global.alert = jest.fn();
//     const admitBtn = tree.root.findByProps({ testID: 'admit' }).props;
//     act(() => admitBtn.onPress());

//     expect(global.alert).toHaveBeenCalledWith("Name can't be empty !");

// });

// test('Birth Day empty input error massage', async () => {
//     global.alert = jest.fn();
//     const name = tree.root.findByProps({ testID: 'name_test' }).props;
//     act(() => name.onChangeText("Lahiu Nuraj"));

//     const admitBtn = tree.root.findByProps({ testID: 'admit' }).props;
//     act(() => admitBtn.onPress());

//     expect(global.alert).toHaveBeenCalledWith("Password can't be empty !");

// });





