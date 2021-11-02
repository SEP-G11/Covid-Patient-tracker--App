import React from "react";
import Signin from "../screens/Signin";
import { act, create } from "react-test-renderer";
import { render, fireEvent } from '@testing-library/react-native';

jest.useFakeTimers()
const navigation = { navigate: jest.fn() }


const tree = create(<Signin navigation={navigation} />);

test('snapshot signin page ', async () => {
    expect(tree).toMatchSnapshot();
});

test('Email empty input error massage', async () => {
    global.alert = jest.fn();
    const signInBtn = tree.root.findByProps({ testID: 'signin' }).props;
    act(() => signInBtn.onPress());

    expect(global.alert).toHaveBeenCalledWith("Email can't be empty !");

});

test('Password empty input error massage', async () => {
    global.alert = jest.fn();
    const email = tree.root.findByProps({ testID: 'email_test' }).props;
    act(() => email.onChangeText("lahiru@gmail.com"));

    const signInBtn = tree.root.findByProps({ testID: 'signin' }).props;
    act(() => signInBtn.onPress());

    expect(global.alert).toHaveBeenCalledWith("Password can't be empty !");

});


test('Invalid user error massage', async () => {
    global.alert = jest.fn();
    const email = tree.root.findByProps({ testID: 'email_test' }).props;
    act(() => email.onChangeText("lahiru@gmail.com"));

    const password = tree.root.findByProps({ testID: 'password_test' }).props;
    act(() => password.onChangeText("ABC*"));

    const signInBtn = tree.root.findByProps({ testID: 'signin' }).props;
    act(() => signInBtn.onPress());

    expect(global.alert).toHaveBeenCalledWith("Invalid User!", "email or password is incorrect.", [{"text": "Okay"}])

});




