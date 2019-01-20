import React, { Component } from 'react';
import { Tab, Tabs } from 'native-base';
import PropTypes from "prop-types";

import { PostDetails } from 'hkufui/components';
import { PRE_RENDER_NUMBER } from './Constants';

class PostSwipable extends Component {
  render() {
    const { comments, onRef, ...restProps } = this.props;
    const context = [];

    comments.forEach((post, index) => {
      context.push(
        <Tab heading={post.id} key={post.id}>
          <PostDetails post={post} index={index+1} />
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
  comments: PropTypes.array.isRequired,
  onRef: PropTypes.func
};

export default PostSwipable;
