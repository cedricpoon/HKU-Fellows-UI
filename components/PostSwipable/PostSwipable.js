import React, { Component } from 'react';
import { Tab, Tabs } from 'native-base';
import PropTypes from "prop-types";

import { PostDetails, PostLoadIndicator } from 'hkufui/components';

class PostSwipable extends Component {
  render() {
    const { comments, onRef, solved, ...restProps } = this.props;
    const context = [];

    if (comments) {
      comments.forEach((comment, index) => {
        const { id } = comment;
        context.push(
          <Tab heading={id} key={id}>
            <PostDetails comment={comment} index={index + 1} selectedAnswer={solved === id} />
          </Tab>
        );
      });
    }

    return (
      <Tabs
        renderTabBar={false}
        prerenderingSiblingsNumber={comments ? comments.length : 0}
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
  onRef: PropTypes.func,
  solved: PropTypes.string
};

export default PostSwipable;
