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
});
