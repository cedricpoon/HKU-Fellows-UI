import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import FilterPopup from './FilterPopup';

describe('Testing FilterPopup Component', () => {
  it('renders as expected with PopupMenu required props', () => {
    const wrapper = shallow(
      <FilterPopup position={0} toggle={() => {}}>
        <View></View>
      </FilterPopup>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
