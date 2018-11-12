import React from 'react';
import { shallow } from 'enzyme';
import Preview from './Preview';

describe('Testing Preview Screen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <Preview />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
