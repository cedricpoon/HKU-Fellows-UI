import React from 'react';
import { shallow } from 'enzyme';
import { Post } from './Post';

describe('Testing Post Screen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <Post comments={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
