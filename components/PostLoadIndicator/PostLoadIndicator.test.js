import React from 'react';
import { shallow } from 'enzyme';
import PostLoadIndicator from './PostLoadIndicator';

describe('Testing PostLoadIndicator Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <PostLoadIndicator />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
