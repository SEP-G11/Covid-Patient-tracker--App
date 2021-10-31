import React from "react";
import Homepage from "../screens/Homepage";
import { render, fireEvent } from '@testing-library/react-native';
import { act, create } from "react-test-renderer";

jest.useFakeTimers()
const navigation = { navigate: jest.fn() }
const tree = create(<Homepage navigation={navigation} />);

test('snapshot home page ', () => {
    expect(tree).toMatchSnapshot();
});

test('navigate to signin screen', () => {
    const getStartBtn = tree.root.findByProps({ testID: 'getStart' }).props;
    getStartBtn.onPress();
    expect(navigation.navigate).toBeCalledWith('Signin');
})






// it('Should Error Message ' , ()=>{

// const {getByText }=render(<Homepage/>);
// const  startBtn = getByText('Get Started');

// fireEvent.press(startBtn);

// const  errorMessage =getByText("Email can't be empty !");
// expect(errorMessage).not.toBeNull();
// }

// )

// import React from "react";
// import Homepage from "../screens/Homepage";
// import renderer from "react-test-renderer";
// import {Button, Text, TextInput, View} from 'react-native'
// import {fireEvent, render, waitFor} from '@testing-library/react-native'

// jest.useFakeTimers()

// test('Home page renders correctly', () =>{
//     const tree = renderer.create(<Homepage/>).toJSON();
//     expect(tree).toMatchSnapshot();
// });


// it ("Invalid input messages" , () =>{
//     const {getAllByText} = render(<Homepage/>);
//     fireEvent.press(getAllByText("Get Started"))

// })