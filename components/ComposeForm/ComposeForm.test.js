import React from 'react';
import { shallow } from 'enzyme';
import ComposeForm from './ComposeForm';

describe('Testing ComposeForm Component', () => {
  const defaultProps = {
    screenHeight: 300
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <ComposeForm {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with onTextUpdates', () => {
    const wrapper = shallow(
      <ComposeForm {...defaultProps} onTextUpdates={{ title: () => {} }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('can toggle mode', () => {
    const wrapper = shallow(
      <ComposeForm {...defaultProps} onToggleMode={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
