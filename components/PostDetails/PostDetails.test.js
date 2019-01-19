import React from 'react';
import { shallow } from 'enzyme';
import PostDetails from './PostDetails';

describe('Testing PostDetails Component', () => {
  const requiredProps = {
    post: {
      id: 'id',
      timestamp: 'timestamp',
      author: 'author',
      content: 'content'
    }
  };

  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <PostDetails {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
