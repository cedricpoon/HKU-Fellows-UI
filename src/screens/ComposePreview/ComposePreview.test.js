import React from 'react';
import { shallow } from 'enzyme';
import ComposePreview from './ComposePreview';

describe('Testing ComposePreview Screen', () => {

  it('renders as expected', () => {
    const wrapper = shallow(
      <ComposePreview username='alanchan' />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
