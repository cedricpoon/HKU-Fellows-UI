import React, { Component } from 'react';
import { Tab, Tabs } from 'native-base';
import PropTypes from "prop-types";

import { PostDetails } from 'hkufui/components';
import { PRE_RENDER_NUMBER } from './Constants';

class PostSwipable extends Component {
  render() {
    const { posts, onRef, ...restProps } = this.props;
    const context = [];

    posts.forEach((post) => {
      context.push(
        <Tab heading={post.id} key={post.id}>
          <PostDetails post={post} />
        </Tab>
      );
    });

    return (
      <Tabs
        renderTabBar={false}
        prerenderingSiblingsNumber={PRE_RENDER_NUMBER}
        ref={onRef}
        {...restProps}
      >
        {context}
      </Tabs>
    );
  }
}

PostSwipable.propTypes = {
  posts: PropTypes.array.isRequired,
  onRef: PropTypes.func
};

export default PostSwipable;
