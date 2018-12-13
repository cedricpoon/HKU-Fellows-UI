import React, { Component } from 'react';
import PropTypes from "prop-types";
import * as Animatable from 'react-native-animatable';
import { FlatList as RNFlatList } from 'react-native';

import Post from './PostPreview/PostPreview';
import * as consts from './Constants';

const FlatList = Animatable.createAnimatableComponent(RNFlatList);

class PostScrollable extends Component {

  _renderPost({item}) {
    return (
      <Post
        id={item.id}
        {...item}
      />
    );
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }

  render() {
    const { posts, ...restProps } = this.props

    if (this.props.posts.length > 0) {
      return (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={this._renderPost}
          animation='fadeIn'
          duration={consts.FADE_IN_DURATION}
          {...restProps}
        />
      );
    } else {
      return null;
    }
  }
}

PostScrollable.propTypes = {
  posts: PropTypes.array.isRequired,
  onUnmount: PropTypes.func
};

export default PostScrollable;
