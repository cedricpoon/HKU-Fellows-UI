import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PreviewFooter, PreviewHeader, PostLoadIndicator } from 'hkufui/components';
import PostPreviewLoader from './PostPreviewLoader/PostPreviewLoader'

import { BLAND, EXPANDING, HALT } from 'hkufui/src/constants/expandStatus';
import { fetchPostsSafe } from './PostPreviewLoader/loadPosts';
import { fetchExpansion } from './expandPosts';

import { circularTint } from 'hkufui/theme/palette';
import { SCROLLABLE_END_REACH_THRESHOLD, ITEM_HEIGHT } from './Constants';

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = { willRefresh: false, isReady: false };

    this._refresh = this._refresh.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._scrollInit = this._scrollInit.bind(this);
    this._scrollableUnmount = this._scrollableUnmount.bind(this);
    this._renderListFooter = this._renderListFooter.bind(this)
  }

  _refresh() {
    this.props.onLoadPost();
  }

  _scrollInit() {
    this.setState({ isReady: true });
  }

  _loadMore() {
    if (this.state.isReady && this.props.expandStatus !== HALT) {
      this.props.onLoadMore();
    }
  }

  _scrollableUnmount() {
    this.setState({ isReady: false });
  }

  _renderRefreshControl() {
    return(
      <RefreshControl
        refreshing={false}
        onRefresh={this._refresh}
        tintColor={circularTint}
      />
    );
  }

  _renderListFooter() {
    const { expandStatus } = this.props;

    if (expandStatus === EXPANDING) {
      return (
        <PostLoadIndicator stalled />
      );
    } else if (expandStatus === HALT) {
      /* no more post footer */
      return null;
    }

    return null;
  }

  render() {
    const { location } = this.props;

    return (
      <Container>
        <PreviewHeader location={location} />
        <PostPreviewLoader
          onScroll={this._scrollInit}
          onUnmount={this._scrollableUnmount}
          onEndReachedThreshold={SCROLLABLE_END_REACH_THRESHOLD}
          onEndReached={this._loadMore}
          refreshControl={this._renderRefreshControl()}
          ListFooterComponent={this._renderListFooter}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
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
  onLoadMore: PropTypes.func.isRequired,
  expandStatus: PropTypes.oneOf([ BLAND, EXPANDING, HALT ]).isRequired
}

const mapStateToProps = state => ({
  location: state.location.courseTitle,
  expandStatus: state.posts.subStatus
});

const mapDispatchToProps = dispatch => ({
  onLoadPost: () => dispatch(fetchPostsSafe()),
  onLoadMore: () => dispatch(fetchExpansion())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
