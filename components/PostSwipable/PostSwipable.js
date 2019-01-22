import React, { Component } from 'react';
import { Tab, Tabs } from 'native-base';
import PropTypes from "prop-types";

import { PostDetails, PostLoadIndicator } from 'hkufui/components';
import { PRE_RENDER_NUMBER } from './Constants';

class PostSwipable extends Component {
  render() {
    const { comments, onRef, ...restProps } = this.props;
    const context = [];

    if (comments) {
      comments.forEach((comment, index) => {
        context.push(
          <Tab heading={comment.id} key={comment.id}>
            <PostDetails comment={comment} index={index+1} />
          </Tab>
        );
      });
    }

    return (
      <Tabs
        renderTabBar={false}
        prerenderingSiblingsNumber={PRE_RENDER_NUMBER}
        ref={onRef}
        {...restProps}
      >
        {comments ? context : (
          <Tab heading='' key=''>
            <PostLoadIndicator page />
          </Tab>
        )}
      </Tabs>
    );
  }
}

PostSwipable.propTypes = {
  comments: PropTypes.array,
  onRef: PropTypes.func
};

export default PostSwipable;
