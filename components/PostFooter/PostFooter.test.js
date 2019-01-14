import React from 'react';
import { shallow } from 'enzyme';
import PostFooter from './PostFooter';

describe('Testing PostFooter Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <PostFooter />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is in first page', () => {
    const wrapper = shallow(
      <PostFooter firstPage />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
