import React from 'react';
import { shallow } from 'enzyme';
import Post from './PostPreview';

describe('Testing PostPreview Component', () => {
  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <Post native timestamp={''} replyNo={0} title={''} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and solved', () => {
    const wrapper = shallow(
      <Post native timestamp={''} replyNo={0} title={''} solved />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and hashtags', () => {
    const wrapper = shallow(
      <Post native timestamp={''} replyNo={0} title={''} primaryHashtag={''} secondaryHashtag={''} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and subtitle', () => {
    const wrapper = shallow(
      <Post native timestamp={''} replyNo={0} title={''} subTitle={''} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and temperature', () => {
    const wrapper = shallow(
      <Post native timestamp={''} replyNo={0} title={''} temperature={0} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with required props and viewed', () => {
    const wrapper = shallow(
      <Post native timestamp={''} replyNo={0} title={''} viewed />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
