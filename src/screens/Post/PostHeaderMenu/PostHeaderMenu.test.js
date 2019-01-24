import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import PostHeaderMenu from './PostHeaderMenu';

describe('Testing PostHeaderMenu Component', () => {
  it('renders as expected with PopupMenu required props', () => {
    const wrapper = shallow(
      <PostHeaderMenu position={{x: 0, y: 0}} toggle={() => {}} index={1}>
        <View></View>
      </PostHeaderMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has onRef', () => {
    const wrapper = shallow(
      <PostHeaderMenu position={{x: 0, y: 0}} toggle={() => {}} index={1} onRef={() => {}}>
        <View></View>
      </PostHeaderMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is solved', () => {
    const wrapper = shallow(
      <PostHeaderMenu position={{x: 0, y: 0}} toggle={() => {}} index={1} solved>
        <View></View>
      </PostHeaderMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
