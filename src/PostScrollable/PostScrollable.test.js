import React from 'react';
import { shallow } from 'enzyme';
import _ from 'enzyme-to-json';
import PostScrollable from './PostScrollable';

describe('Testing PostScrollable Component', () => {
  it('renders as expected with posts', () => {
    const wrapper = shallow(
      <PostScrollable posts={[]} />
    );
    expect(_(wrapper)).toMatchSnapshot();
  });
});
