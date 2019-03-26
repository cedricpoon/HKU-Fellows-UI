import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';

import FilterPopup from './FilterPopup';

describe('Testing FilterPopup Component', () => {
  const requiredProps = {
    position: {x: 0, y: 0},
    toggle: () => {},
    onFilterThunk: () => {}
  };

  it('renders as expected with PopupMenu required props', () => {
    const wrapper = shallow(
      <FilterPopup {...requiredProps}>
        <View></View>
      </FilterPopup>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has onRef', () => {
    const wrapper = shallow(
      <FilterPopup {...requiredProps} onRef={() => {}}>
        <View></View>
      </FilterPopup>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
