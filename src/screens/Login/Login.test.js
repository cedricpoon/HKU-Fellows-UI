import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './Login';

describe('Testing Login Screen', () => {
  const requiredProps = {
    onLogin: () => {},
    onClearCredential: () => {}
  }

  it('renders as expected', () => {
    const wrapper = shallow(
      <Login {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has credential', () => {
    const wrapper = shallow(
      <Login {...requiredProps} credential={{}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
