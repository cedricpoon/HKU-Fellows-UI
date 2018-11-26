import React, { Component } from 'react';
import PropTypes from "prop-types";
import { FlatList } from 'react-native';

import Post from './PostPreview/PostPreview';

class PostScrollable extends Component {

  _renderPost({item}) {
    return (
      <Post
        id={item.id}
        {...item}
      />
    );
  }

  render() {
    const { posts, ...restProps } = this.props

    if (this.props.posts.length > 0) {
      return (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={this._renderPost}
          {...restProps}
        />
      );
    } else {
      return null;
    }
  }
}

PostScrollable.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostScrollable;
