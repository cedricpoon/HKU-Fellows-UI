import React, { Component } from 'react';
import { View } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  PostScrollable,
  PostPlaceholder
} from 'hkufui/components';

import { OK, FAIL, LOADING, STILL } from 'hkufui/src/constants/loadStatus';

import { fetchPosts } from './loadPosts';

import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export class PostPreviewLoader extends Component {

  render() {
    const { posts, location, status, onFetchPosts } = this.props;

    if (posts && posts.length > 0 && status === OK) {
      return (<PostScrollable posts={posts} />);
    } else if (location === '' && status === STILL) {
      return (
        <PostPlaceholder
          headline={locale['post.noCourseTitle']}
          headlineColor='green'
          subHeadline={locale['post.noCourseContent']}
          icon={{name: 'md-book'}}
        />
      );
    } else if (posts && posts.length === 0 && status === OK) {
      return (
        <PostPlaceholder
          headline={locale['post.noPostTitle']}
          subHeadline={locale['post.noPostContent']}
          icon={{name: 'paper'}}
        />
      );
    } else if (status === FAIL) {
      return (
        <PostPlaceholder
          headline={locale['post.loadErrorTitle']}
          headlineColor='red'
          subHeadline={locale['post.loadErrorContent']}
          icon={{name: 'flash', active: true}}
          button={{text: 'Refresh', onPress: onFetchPosts}}
        />
      );
    } else {
      return (
        <View>
        </View>
      );
    }
  }
}

PostPreviewLoader.defaultProps = {
  posts: [],
  location: '',
  status: STILL
}

PostPreviewLoader.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.string,
  status: PropTypes.oneOf([ OK, FAIL, LOADING, STILL ]),
  onFetchPosts: PropTypes.func
}

const mapStateToProps = state => ({
  location: state.location.courseTitle,
  posts: state.posts.posts,
  status: state.posts.status
});

const mapDispatchToProps = dispatch => ({
  onFetchPosts: () => dispatch(fetchPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPreviewLoader);
