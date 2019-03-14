import React from 'react';
import { shallow } from 'enzyme';
import ComposePreview from './ComposePreview';
import { STILL, LOADING } from 'hkufui/src/constants/loadStatus';

describe('Testing ComposePreview Screen', () => {
  const defaultProps = {
    username:'alanchan',
    onComposeNative: () => {},
    onComposeMoodle: () => {}
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <ComposePreview {...defaultProps} status={STILL} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is creating post', () => {
    const wrapper = shallow(
      <ComposePreview {...defaultProps} status={LOADING} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
