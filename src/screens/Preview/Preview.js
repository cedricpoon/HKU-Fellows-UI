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
import { onUpdateFilter, onUpdateQuery, onUpdateKeyword, resetQueryKeyword } from './filterPosts';
import styles from './Styles';
import { classifyQuery } from './helper';

import { circularTint } from 'hkufui/theme/palette';
import { localize } from 'hkufui/locale';
import { SCROLLABLE_END_REACH_THRESHOLD, ITEM_HEIGHT } from './Constants';

const locale = localize({ language: 'en', country: 'hk' });

export class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = { willRefresh: false, isReady: false, searched: false };
  }

  _refresh = () => {
    this.props.onLoadPost();
  }

  _scrollInit = () => {
    this.setState({ isReady: true });
  }

  _loadMore = () => {
    if (this.state.isReady && this.props.expandStatus === BLAND) {
      this.props.onLoadMore();
    }
  }

  _scrollableUnmount = () => {
    this.setState({ isReady: false });
  }

  _renderRefreshControl = () => {
    return(
      <RefreshControl
        refreshing={false}
        onRefresh={this._refresh}
        tintColor={circularTint}
      />
    );
  }

  _renderListFooter = () => {
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

  _filterWrapper = (filter) => {
    const { onUpdateFilter } = this.props;
    return () => {
      onUpdateFilter(filter);
      this.footer.filterToggle();
    };
  }

  _searchWrapper = (query) => {
    const { onUpdateQuery, onUpdateKeyword } = this.props;
    return () => {
      const target = classifyQuery(query);
      this.setState({ searched: true });

      if (typeof target === 'object') {
        onUpdateKeyword(target);
      } else {
        onUpdateQuery(target);
      }
    }
  }

  componentDidUpdate() {
    const { shouldSearchBarEmpty } = this.props;
    const { searched } = this.state;

    if (this._header && searched && shouldSearchBarEmpty) {
      this._header.searchCancel();
    }
  }

  render() {
    const { location, loadStatus, currentFilter, onResetQueryKeyword } = this.props;
    const cancel = (isNotEmpty) => {
      if (isNotEmpty) {
        onResetQueryKeyword();
        this.setState({ searched: false });
      }
    }
    return (
      <Container>
        <PreviewHeader
          location={location}
          onSearchThunk={this._searchWrapper}
          onCancel={cancel}
          ref={ref => this._header = ref}
        />
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
  onUpdateKeyword: PropTypes.func.isRequired,
  onUpdateQuery: PropTypes.func.isRequired,
  onResetQueryKeyword: PropTypes.func.isRequired,
  expandStatus: PropTypes.oneOf(Object.values(_expandStatus)).isRequired,
  loadStatus: PropTypes.oneOf(Object.values(_loadStatus)).isRequired,
  currentFilter: PropTypes.number.isRequired,
  shouldSearchBarEmpty: PropTypes.bool
}

const mapStateToProps = state => ({
  location: state.location.courseTitle,
  expandStatus: state.posts.subStatus,
  loadStatus: state.posts.status,
  currentFilter: state.posts.filter,
  shouldSearchBarEmpty: !state.posts.query && !state.posts.hashtag
});

const mapDispatchToProps = dispatch => ({
  onLoadPost: () => dispatch(fetchPostsSafe()),
  onLoadMore: () => dispatch(fetchExpansion()),
  onUpdateFilter: (filter) => dispatch(fetchPostsSafe(onUpdateFilter(filter))),
  onUpdateKeyword: (keyword) => dispatch(dispatch => {
    dispatch(onUpdateKeyword(keyword));
    dispatch(fetchPostsSafe());
  }),
  onUpdateQuery: (query) => dispatch(dispatch => {
    dispatch(onUpdateQuery(query));
    dispatch(fetchPostsSafe());
  }),
  onResetQueryKeyword: () => dispatch(dispatch => {
    dispatch(resetQueryKeyword());
    dispatch(fetchPostsSafe());
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
