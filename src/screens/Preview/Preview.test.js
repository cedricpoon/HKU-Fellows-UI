import React from 'react';
import { shallow } from 'enzyme';
import { Preview } from './Preview';

describe('Testing Preview Screen', () => {
  const defaultProps = {
    onLoadPost: () => {}
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <Preview location='' {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
