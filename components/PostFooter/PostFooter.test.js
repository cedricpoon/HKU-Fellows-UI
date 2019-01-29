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

  it('contains share payload', () => {
    const wrapper = shallow(
      <PostFooter sharePayload='%7B%22a%22:%22a%22,%22b%22:%22c%22%7D' />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
