import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('Testing Logo Component', () => {
  const requiredProps = {
    size: 150
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <Logo {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
