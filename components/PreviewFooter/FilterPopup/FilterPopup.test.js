import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import FilterPopup from './FilterPopup';

describe('Testing FilterPopup Component', () => {
  it('renders as expected with PopupMenu required props', () => {
    const wrapper = shallow(
      <FilterPopup position={{x: 0, y: 0}} toggle={() => {}}>
        <View></View>
      </FilterPopup>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has onRef', () => {
    const wrapper = shallow(
      <FilterPopup position={{x: 0, y: 0}} toggle={() => {}} onRef={() => {}}>
        <View></View>
      </FilterPopup>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
