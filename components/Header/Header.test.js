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
});
