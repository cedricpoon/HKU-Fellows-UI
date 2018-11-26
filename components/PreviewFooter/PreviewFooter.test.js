import React from 'react';
import { shallow } from 'enzyme';
import PreviewFooter from './PreviewFooter';

describe('Testing PreviewFooter Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <PreviewFooter />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders in muted', () => {
    const wrapper = shallow(
      <PreviewFooter muted />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
