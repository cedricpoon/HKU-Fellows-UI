import React from 'react';
import { shallow } from 'enzyme';

import PostPlaceholder from './PostPlaceholder';

describe('Testing PostPlaceholder Component', () => {
  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <PostPlaceholder headline='' />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with subHeadline', () => {
    const wrapper = shallow(
      <PostPlaceholder headline='' subHeadline='' />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with headline colored', () => {
    const wrapper = shallow(
      <PostPlaceholder headline='' headlineColor='green' />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with subHeadline and icon and button', () => {
    const wrapper = shallow(
      <PostPlaceholder headline='' subHeadline='' icon={{name:'apps'}} button={{text: ''}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
