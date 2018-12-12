import React from 'react';
import { shallow } from 'enzyme';
import PreviewFooter from './PreviewFooter';

describe('Testing PreviewFooter Component', () => {
  const required = { onRefresh: () => {} };

  it('renders as expected with requiredProps', () => {
    const wrapper = shallow(
      <PreviewFooter {...required} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders in muted', () => {
    const wrapper = shallow(
      <PreviewFooter muted {...required} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
