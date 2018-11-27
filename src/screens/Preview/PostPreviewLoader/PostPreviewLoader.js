import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View } from 'native-base';
import {
  PlaceholderContainer,
  Placeholder
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  PostScrollable,
  PostPlaceholder
} from 'hkufui/components';
import { OK, FAIL, LOADING, STILL } from 'hkufui/src/constants/loadStatus';
import { fetchPosts } from './loadPosts';
import { localize } from 'hkufui/locale';
import styles from './Styles';

const locale = localize({ language: 'en', country: 'hk' });

const LOADER_GROUP_HEIGHT = 80;
const EST_HEADER_HEIGHT = 65;
const EST_FOOTER_HEIGHT = 55;
const LIGHTER_COLOR = '#eeeeee';
const DARKER_COLOR = '#dddddd';

export class PostPreviewLoader extends Component {

  componentDidMount() {
    const { location, status, onFetchPosts } = this.props;

    // load on reopen app
    if (location !== '' && status === STILL) {
      onFetchPosts();
    }
  }

  _renderGradient() {
    return (
      <LinearGradient
        colors={[LIGHTER_COLOR, DARKER_COLOR, LIGHTER_COLOR]}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 0.0 }}
        style={styles.gradient}
      />
    );
  }

  _renderLoadPlaceholder() {
    const { height } = Dimensions.get('window');
    let context = [];

    for (let i = 0; i < height - EST_FOOTER_HEIGHT - EST_HEADER_HEIGHT; i += LOADER_GROUP_HEIGHT) {
      context.push(
        <View key={i} style={styles.placeholderGroup}>
          <Placeholder
            style={[styles.placeholder, styles.placeholderShort]}
          />
          <Placeholder
            style={[styles.placeholder, styles.placeholderLong]}
          />
          <Placeholder
            style={[styles.placeholder, styles.placeholderLong]}
          />
        </View>
      );
      context.push(<View key={`${i}s`} style={styles.hr}></View>);
    }

    return(
      <PlaceholderContainer
        animatedComponent={this._renderGradient()}
        duration={1000}
        delay={1000}
      >
        {context}
      </PlaceholderContainer>
    );
  }

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
          button={{text: locale['post.noPostButton']}}
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
      return (this._renderLoadPlaceholder());
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
