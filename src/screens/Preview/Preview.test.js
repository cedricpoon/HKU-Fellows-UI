import React from 'react';
import { shallow } from 'enzyme';
import { Preview } from './Preview';
import { STILL } from 'hkufui/src/constants/loadStatus';

describe('Testing Preview Screen', () => {
  const defaultProps = {
    onLoadPost: () => {},
    status: STILL
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <Preview location='' {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
