import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';

import PopupMenu from './PopupMenu';

describe('Testing PopupMenu Component', () => {
  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <PopupMenu position={{x: 0, y:0}}>
        <View></View>
      </PopupMenu>
    );
    // open menu for rendering
    wrapper.instance().toggle();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and parentHeight', () => {
    const wrapper = shallow(
      <PopupMenu position={{x: 0, y:0}} parentHeight={0}>
        <View></View>
      </PopupMenu>
    );
    // open menu for rendering
    wrapper.instance().toggle();
    expect(wrapper).toMatchSnapshot();
  });
});
