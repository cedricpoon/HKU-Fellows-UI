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

  it('is in last page', () => {
    const wrapper = shallow(
      <PostFooter lastPage />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('contains page change callback', () => {
    const wrapper = shallow(
      <PostFooter onPageChangeThunk={() => { return () => {} }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
