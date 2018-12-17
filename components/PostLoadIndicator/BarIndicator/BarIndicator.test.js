import React from 'react';
import { shallow } from 'enzyme';
import BarIndicator from './BarIndicator';

describe('Testing BarIndicator Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <BarIndicator />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with delayed animation', () => {
    const wrapper = shallow(
      <BarIndicator delayed={1} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without animatio ', () => {
    const wrapper = shallow(
      <BarIndicator stalled />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
