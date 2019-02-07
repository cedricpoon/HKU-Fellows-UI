import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PreviewFooter, PreviewHeader, PostLoadIndicator } from 'hkufui/components';
import PostPreviewLoader from './PostPreviewLoader/PostPreviewLoader'

import * as _expandStatus from 'hkufui/src/constants/expandStatus';
import { BLAND, EXPANDING } from 'hkufui/src/constants/expandStatus';
import * as _loadStatus from 'hkufui/src/constants/loadStatus';
import { OK } from 'hkufui/src/constants/loadStatus';

import { fetchPostsSafe } from './PostPreviewLoader/loadPosts';
import { fetchExpansion } from './expandPosts';
import { onUpdateFilter } from './filterPosts';
import styles from './Styles';

import { circularTint } from 'hkufui/theme/palette';
import { localize } from 'hkufui/locale';
import { SCROLLABLE_END_REACH_THRESHOLD, ITEM_HEIGHT } from './Constants';

const locale = localize({ language: 'en', country: 'hk' });

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = { willRefresh: false, isReady: false };

    this._refresh = this._refresh.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._scrollInit = this._scrollInit.bind(this);
    this._scrollableUnmount = this._scrollableUnmount.bind(this);
    this._renderListFooter = this._renderListFooter.bind(this);
    this._filterWrapper = this._filterWrapper.bind(this);
  }

  _refresh() {
    this.props.onLoadPost();
  }

  _scrollInit() {
    this.setState({ isReady: true });
  }

  _loadMore() {
    if (this.state.isReady && this.props.expandStatus === BLAND) {
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
      return (<PostLoadIndicator stalled />);
    }
    /* no more post footer */
    return (
      <Text note style={styles.copyright}>
        {locale['post.copyright']}
      </Text>
    );
  }

  _filterWrapper(filter) {
    const { onUpdateFilter } = this.props;
    return () => {
      onUpdateFilter(filter);
      this.footer.filterToggle();
    };
  }

  render() {
    const { location, loadStatus, currentFilter } = this.props;

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
          refreshing={loadStatus !== OK}
          popupProps={{
            onFilterThunk: this._filterWrapper,
            disabled: currentFilter
          }}
          ref={ref => this.footer = ref}
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
  onUpdateFilter: PropTypes.func.isRequired,
  expandStatus: PropTypes.oneOf(Object.values(_expandStatus)).isRequired,
  loadStatus: PropTypes.oneOf(Object.values(_loadStatus)).isRequired,
  currentFilter: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  location: state.location.courseTitle,
  expandStatus: state.posts.subStatus,
  loadStatus: state.posts.status,
  currentFilter: state.posts.filter
});

const mapDispatchToProps = dispatch => ({
  onLoadPost: () => dispatch(fetchPostsSafe()),
  onLoadMore: () => dispatch(fetchExpansion()),
  onUpdateFilter: (filter) => dispatch(fetchPostsSafe(onUpdateFilter(filter)))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
