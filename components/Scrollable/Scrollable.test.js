import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';

import Scrollable from './Scrollable';

describe('Testing Scrollable Component', () => {
  const renderer = () => (<View></View>);

  const requiredProps = {
    items: ['a', 'b', 'c'],
    itemRenderer: renderer
  };

  it('renders as expected with posts', () => {
    const wrapper = shallow(
      <Scrollable {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with onUnmount event', () => {
    const wrapper = shallow(
      <Scrollable {...requiredProps} onUnmount={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
