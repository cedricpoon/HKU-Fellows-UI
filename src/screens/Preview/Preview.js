import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PostScrollable, PreviewFooter, PreviewHeader } from 'hkufui/components';
import posts from 'hkufui/mock/public/posts'

export class Preview extends Component {
  render() {
    const { posts, location } = this.props;

    return (
      <Container>
        <PreviewHeader location={location} />
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
  posts: posts,
  location: ''
}

Preview.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.string
}

const mapStateToProps = state => ({
  location: state.location.courseTitle
});

export default connect(mapStateToProps)(Preview);
