import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Testing Header Component', () => {
  it('renders as expected with title', () => {
    const wrapper = shallow(
      <Header title="Header" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with back button', () => {
    const wrapper = shallow(
      <Header title="Header" backable />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with subtitle', () => {
    const wrapper = shallow(
      <Header title="Header" subtitle="None" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with subtitle and regarding line numbers', () => {
    const wrapper = shallow(
      <Header title="Header" subtitle="None" titleNumberOfLines={2} subtitleNumberOfLines={2} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with right button', () => {
    const wrapper = shallow(
      <Header title="Header" rightIcon="arrow-dropup" onRightPress={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
