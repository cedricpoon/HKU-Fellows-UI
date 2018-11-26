import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  PostScrollable,
  PreviewFooter,
  PreviewHeader,
  PostPlaceholder
} from 'hkufui/components';

import posts from 'hkufui/mock/public/posts';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export class Preview extends Component {
  _renderContext() {
    const { posts, location } = this.props;

    if (posts && posts.length > 0)
      return (<PostScrollable posts={posts} />);
    else if (location === '')
      return (
        <PostPlaceholder
          headline={locale['post.noCourseTitle']}
          headlineColor='green'
          subHeadline={locale['post.noCourseContent']}
          icon={{name: 'md-book'}}
        />
      );
    else
      return (
        <PostPlaceholder
          headline={locale['post.noPostTitle']}
          subHeadline={locale['post.noPostContent']}
          icon={{name: 'paper'}}
        />
      );
  }

  render() {
    const { location } = this.props;

    return (
      <Container>
        <PreviewHeader location={location} />
        <Content>
          {this._renderContext.bind(this)()}
        </Content>
        <PreviewFooter />
      </Container>
    );
  }
}

/* Mocking mapStateToProps */
Preview.defaultProps = {
  posts: [],
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
