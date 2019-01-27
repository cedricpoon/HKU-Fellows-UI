import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { PostHeaderMenu } from './PostHeaderMenu';

describe('Testing PostHeaderMenu Component', () => {
  const requiredProps = {
    postId: 'postId',
    topicId: 'topicId',
    index: 1,
    position: {x: 0, y: 0},
    toggle: () => {}
  };

  it('renders as expected with PopupMenu required props', () => {
    const wrapper = shallow(
      <PostHeaderMenu  {...requiredProps}>
        <View></View>
      </PostHeaderMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has onRef', () => {
    const wrapper = shallow(
      <PostHeaderMenu  {...requiredProps} onRef={() => {}}>
        <View></View>
      </PostHeaderMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is solved', () => {
    const wrapper = shallow(
      <PostHeaderMenu {...requiredProps} solved>
        <View></View>
      </PostHeaderMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
