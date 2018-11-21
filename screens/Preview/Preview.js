import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';

import { PostScrollable, PreviewFooter, PreviewHeader } from 'hkufui/components';
import posts from 'hkufui/mock/public/posts'

class Preview extends Component {
  render() {
    const { posts } = this.props;

    return (
      <Container>
        <PreviewHeader location='COMP 4801' />
        <Content>
          <PostScrollable posts={posts} />
        </Content>
        <PreviewFooter />
      </Container>
    );
  }
}

/* Mocking mapStateToProps */
Preview.defaultProps = {
  posts: posts
}

Preview.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Preview;
