import React from 'react';
import { shallow } from 'enzyme';
import PostSwipable from './PostSwipable';

describe('Testing PostSwipable Component', () => {
  const requiredProps = {
    comments: []
  };

  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <PostSwipable {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has onRef', () => {
    const wrapper = shallow(
      <PostSwipable {...requiredProps} onRef={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
