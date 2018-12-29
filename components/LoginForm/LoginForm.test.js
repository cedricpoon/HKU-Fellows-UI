import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('Testing LoginForm Component', () => {
  const requiredProps = {
    alert: () => {},
    onLogin: () => {}
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <LoginForm {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is logging in', () => {
    const wrapper = shallow(
      <LoginForm {...requiredProps} loggingIn />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
