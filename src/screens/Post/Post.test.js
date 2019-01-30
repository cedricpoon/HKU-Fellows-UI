import React from 'react';
import { shallow } from 'enzyme';
import { Post } from './Post';

describe('Testing Post Screen', () => {
  const requiredProps = {
    credential: {},
    encryptor: () => { return '' },
    decryptor: () => { return {} }
  };

  it('renders as expected', () => {
    const wrapper = shallow(
      <Post comments={[]} {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is loading', () => {
    const wrapper = shallow(
      <Post {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
