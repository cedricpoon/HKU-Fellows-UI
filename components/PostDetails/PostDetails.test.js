import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import PostDetails from './PostDetails';

describe('Testing PostDetails Component', () => {
  const mockMarkdownRenderer = () => {
    return <View></View>;
  }

  const requiredProps = {
    index: 1,
    comment: {
      id: 'id',
      timestamp: 'timestamp',
      author: 'author',
      content: 'content',
      temperature: 1
    },
    markdownRenderer: mockMarkdownRenderer,
    htmlRenderer: mockMarkdownRenderer
  };

  it('renders as expected with required props', () => {
    const wrapper = shallow(
      <PostDetails {...requiredProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('is selectedAnswer', () => {
    const wrapper = shallow(
      <PostDetails {...requiredProps} selectedAnswer />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with markdown', () => {
    const wrapper = shallow(
      <PostDetails {...requiredProps} native />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
