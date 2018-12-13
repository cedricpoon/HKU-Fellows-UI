import React from 'react';
import { shallow } from 'enzyme';
import { Preview } from './Preview';
import { BLAND, EXPANDING, HALT } from 'hkufui/src/constants/expandStatus';

describe('Testing Preview Screen', () => {
  const defaultProps = {
    onLoadPost: () => {},
    onLoadMore: () => {}
  };

  it('renders as expected without load more', () => {
    const wrapper = shallow(
      <Preview location='' expandStatus={BLAND} {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with loading more', () => {
    const wrapper = shallow(
      <Preview location='' expandStatus={EXPANDING} {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with last post', () => {
    const wrapper = shallow(
      <Preview location='' expandStatus={HALT} {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
