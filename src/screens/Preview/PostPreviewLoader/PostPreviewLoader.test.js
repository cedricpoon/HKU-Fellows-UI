import React from 'react';
import { shallow } from 'enzyme';
import { PostPreviewLoader } from './PostPreviewLoader';
import { OK, FAIL, LOADING } from 'hkufui/src/constants/loadStatus';

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

  it('renders as expected with failed state', () => {
    const wrapper = shallow(
      <PostPreviewLoader {...defaultProps} location='location' status={FAIL} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with no post placeholder', () => {
    const wrapper = shallow(
      <PostPreviewLoader {...defaultProps} location='location' status={OK} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with loading', () => {
    const wrapper = shallow(
      <PostPreviewLoader {...defaultProps} location='location' status={LOADING} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
