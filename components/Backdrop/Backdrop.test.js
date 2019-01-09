import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheet } from 'react-native';
import Backdrop from './Backdrop';

describe('Testing Backdrop Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <Backdrop />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is styled', () => {
    const wrapper = shallow(
      <Backdrop style={StyleSheet.create({})} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
