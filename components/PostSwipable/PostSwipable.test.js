import React from 'react';
import { shallow } from 'enzyme';
import PostSwipable from './PostSwipable';

describe('Testing PostSwipable Component', () => {

  it('renders with placeholder', () => {
    const wrapper = shallow(
      <PostSwipable />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has onRef', () => {
    const wrapper = shallow(
      <PostSwipable comments={[]} onRef={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is solved', () => {
    const wrapper = shallow(
      <PostSwipable comments={[]} onRef={() => {}} solved='uid' />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
