import React from 'react';
import { shallow } from 'enzyme';
import { PostPreviewLoader } from './PostPreviewLoader';

describe('Testing PostPreviewLoader', () => {
  const defaultProps = {
    courses: [],
    onFetchPosts: () => {}
  }

  it('renders as expected with defaultProps', () => {
    const wrapper = shallow(
      <PostPreviewLoader {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
