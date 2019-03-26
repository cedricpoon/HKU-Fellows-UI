import React from 'react';
import { shallow } from 'enzyme';

import PostLoadIndicator from './PostLoadIndicator';

describe('Testing PostLoadIndicator Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <PostLoadIndicator />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected in multiple', () => {
    const wrapper = shallow(
      <PostLoadIndicator multiple />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as a page', () => {
    const wrapper = shallow(
      <PostLoadIndicator page />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
