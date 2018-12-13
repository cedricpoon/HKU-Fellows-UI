import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PreviewFooter, PreviewHeader } from 'hkufui/components';
import PostPreviewLoader from './PostPreviewLoader/PostPreviewLoader'

import { fetchPostsSafe } from './PostPreviewLoader/loadPosts';
import { fetchExpansion } from './expandPosts';

import { circularTint } from 'hkufui/theme/palette';
import { SCROLLABLE_END_REACH_THRESHOLD } from './Constants';

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = { willRefresh: false, isReady: false };

    this._refresh = this._refresh.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._scrollInit = this._scrollInit.bind(this);
    this._scrollableUnmount = this._scrollableUnmount.bind(this);
  }

  _refresh() {
    this.props.onLoadPost();
  }

  _scrollInit() {
    this.setState({ isReady: true });
  }

  _loadMore() {
    if (this.state.isReady) {
      this.props.onLoadMore();
    }
  }

  _scrollableUnmount() {
    this.setState({ isReady: false });
  }

  render() {
    const { location } = this.props;

    return (
      <Container>
        <PreviewHeader location={location} />
        <PostPreviewLoader
          onEndReached={this._loadMore}
          onScroll={this._scrollInit}
          onUnmount={this._scrollableUnmount}
          onEndReachedThreshold={SCROLLABLE_END_REACH_THRESHOLD}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this._refresh}
              tintColor={circularTint}
            />
          }
        />
        <PreviewFooter
          muted={location === ''}
          onRefresh={this._refresh}
        />
      </Container>
    );
  }
}

Preview.defaultProps = {
  location: ''
}

Preview.propTypes = {
  location: PropTypes.string,
  onLoadPost: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  location: state.location.courseTitle
});

const mapDispatchToProps = dispatch => ({
  onLoadPost: () => dispatch(fetchPostsSafe()),
  onLoadMore: () => dispatch(fetchExpansion())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
