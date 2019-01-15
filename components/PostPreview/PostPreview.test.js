import React from 'react';
import { shallow } from 'enzyme';
import Post from './PostPreview';

describe('Testing PostPreview Component', () => {
  const requiredProps = {
    id: 'id',
    native: true,
    timestamp: '',
    replyNo: 0,
    title: ''
  }

  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <Post {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and solved', () => {
    const wrapper = shallow(
      <Post {...requiredProps} solved />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and hashtags', () => {
    const wrapper = shallow(
      <Post {...requiredProps} primaryHashtag={''} secondaryHashtag={''} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and subtitle', () => {
    const wrapper = shallow(
      <Post {...requiredProps} subTitle={''} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and temperature', () => {
    const wrapper = shallow(
      <Post {...requiredProps} temperature={0} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and viewed', () => {
    const wrapper = shallow(
      <Post {...requiredProps} viewed />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
