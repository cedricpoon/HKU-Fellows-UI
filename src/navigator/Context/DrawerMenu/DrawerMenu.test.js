import React from 'react';
import { shallow } from 'enzyme';
import DrawerMenu from './DrawerMenu';

describe('Testing DrawerMenu Component', () => {
  const requiredProps = {
    onLogout: () => {},
    onTemperature: () => {}
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <DrawerMenu {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
