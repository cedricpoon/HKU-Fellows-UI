import React from 'react';
import { shallow } from 'enzyme';
import { Compose } from './Compose';

describe('Testing Compose Screen', () => {
  const requiredProps = {
    location: 'location'
  }

  it('renders as expected', () => {
    const wrapper = shallow(
      <Compose {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
