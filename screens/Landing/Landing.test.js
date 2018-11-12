import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';

describe('Testing Landing Screen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <Landing />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
