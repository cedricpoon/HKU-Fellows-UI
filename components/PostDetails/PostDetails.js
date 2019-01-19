import React, { Component } from 'react';
import { Content, Text } from 'native-base';
import PropTypes from "prop-types";

class PostSwipable extends Component {
  render() {
    const { id } = this.props.post;

    return (
      <Content>
        <Text>{id}</Text>
      </Content>
    );
  }
}

PostSwipable.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

export default PostSwipable;
