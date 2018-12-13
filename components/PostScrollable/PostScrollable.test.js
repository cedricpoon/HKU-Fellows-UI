import React from 'react';
import { shallow } from 'enzyme';
import PostScrollable from './PostScrollable';

describe('Testing PostScrollable Component', () => {
  it('renders as expected with posts', () => {
    const wrapper = shallow(
      <PostScrollable posts={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with onUnmount event', () => {
    const wrapper = shallow(
      <PostScrollable posts={[]} onUnmount={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
