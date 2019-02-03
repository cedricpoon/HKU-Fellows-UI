import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Scrollable, PostPlaceholder, PostLoadIndicator, PostPreview } from 'hkufui/components';
import { OK, FAIL, LOADING, STILL } from 'hkufui/src/constants/loadStatus';
import NavigationService from 'hkufui/src/NavigationService';
import { fetchPosts } from './loadPosts';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export class PostPreviewLoader extends Component {

  componentDidMount() {
    const { location, status, onFetchPosts } = this.props;

    // load on reopen app
    if (location !== '' && status === STILL) {
      onFetchPosts();
    }
  }

  render() {
    const { posts, location, status, onFetchPosts, ...restProps } = this.props;

    if (posts && posts.length > 0 && status === OK) {
      return (
        <Scrollable
          items={posts}
          itemRenderer={({item}) => {
            return (
              <PostPreview
                id={item.id}
                {...item}
              />
            );
          }}
          {...restProps}
        />
      );
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
          icon={{name: 'md-paper'}}
          button={{
            text: locale['post.noPostButton'],
            onPress: () => { NavigationService.navigate('Compose') }
          }}
        />
      );
    } else if (status === FAIL) {
      return (
        <PostPlaceholder
          headline={locale['post.loadErrorTitle']}
          headlineColor='red'
          subHeadline={locale['post.loadErrorContent']}
          icon={{name: 'flash', active: true}}
          button={{text: locale['post.loadErrorButton'], onPress: onFetchPosts}}
        />
      );
    } else {
      return (
        <PostLoadIndicator multiple />
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
  onFetchPosts: PropTypes.func.isRequired
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
