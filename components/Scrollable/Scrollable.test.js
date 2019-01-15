import React from 'react';
import { shallow } from 'enzyme';
import Scrollable from './Scrollable';

describe('Testing Scrollable Component', () => {
  const requiredProps = {
    items: [],
    itemRenderer: () => { return null; }
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
