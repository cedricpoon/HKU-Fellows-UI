import React from 'react';
import { shallow } from 'enzyme';
import { Preview } from './Preview';
import { BLAND, EXPANDING, HALT } from 'hkufui/src/constants/expandStatus';
import { OK } from 'hkufui/src/constants/loadStatus';

describe('Testing Preview Screen', () => {
  const defaultProps = {
    onLoadPost: () => {},
    onLoadMore: () => {}
  };

  it('renders as expected without load more', () => {
    const wrapper = shallow(
      <Preview location='' expandStatus={BLAND} loadStatus={OK} {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with loading more', () => {
    const wrapper = shallow(
      <Preview location='' expandStatus={EXPANDING} loadStatus={OK} {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with last post', () => {
    const wrapper = shallow(
      <Preview location='' expandStatus={HALT} loadStatus={OK} {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is loaded', () => {
    const wrapper = shallow(
      <Preview loadStatus={OK} expandStatus={BLAND} {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
