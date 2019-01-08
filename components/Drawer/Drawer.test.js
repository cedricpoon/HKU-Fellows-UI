import React from 'react';
import { shallow } from 'enzyme';
import Drawer from './Drawer';

describe('Testing Drawer Component', () => {
  const requiredProps = {
    onLogout: () => {}
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <Drawer {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
