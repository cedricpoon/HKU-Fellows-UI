import React from 'react';
import { shallow } from 'enzyme';
import { Post } from './Post';
import defaultState from 'hkufui/src/store/globalState';

describe('Testing Post Screen', () => {
  const requiredProps = {
    credential: {},
    encryptor: () => { return '' },
    decryptor: () => { return {} },
    topicInfo: defaultState.replies.topicInfo
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
