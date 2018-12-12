import React, { Component } from 'react';
import { RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PreviewFooter, PreviewHeader } from 'hkufui/components';
import PostPreviewLoader from './PostPreviewLoader/PostPreviewLoader'

import { fetchPostsSafe } from './PostPreviewLoader/loadPosts';

export class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = { willRefresh: false };

    this._refresh = this._refresh.bind(this);
    this._requestPullRefresh = this._requestPullRefresh.bind(this);
    this._pullRefresh = this._pullRefresh.bind(this);
  }

  _refresh() {
    this.props.onLoadPost();
  }

  _requestPullRefresh() {
    this.setState({ willRefresh: true });
  }

  _pullRefresh() {
    if (this.state.willRefresh) {
      this._refresh();
      this.setState({ willRefresh: false });
    }
  }

  render() {
    const { location } = this.props;

    return (
      <Container>
        <PreviewHeader location={location} />
        <TouchableWithoutFeedback onPressOut={this._pullRefresh}>
          <PostPreviewLoader
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={this._requestPullRefresh}
              />
            }
          />
        </TouchableWithoutFeedback>
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
  onLoadPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  location: state.location.courseTitle
});

const mapDispatchToProps = dispatch => ({
  onLoadPost: () => dispatch(fetchPostsSafe())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
