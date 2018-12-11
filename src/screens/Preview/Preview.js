import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PreviewFooter, PreviewHeader } from 'hkufui/components';
import PostPreviewLoader from './PostPreviewLoader/PostPreviewLoader'

import { OK, FAIL, LOADING, STILL } from 'hkufui/src/constants/loadStatus';
import { fetchPostsSafe } from './PostPreviewLoader/loadPosts';

export class Preview extends Component {

  _refresh() {
    this.props.onLoadPost();
  }

  componentDidUpdate() {
    if (this.props.status === LOADING) {
      this._content._root.scrollToPosition(0, 0, false);
    }
  }

  render() {
    const { location, status } = this.props;

    return (
      <Container>
        <PreviewHeader location={location} />
        <Content
          ref={ref => { this._content = ref }}
          scrollEnabled={status !== LOADING}
        >
          <PostPreviewLoader />
        </Content>
        <PreviewFooter
          muted={location === ''}
          onRefresh={this._refresh.bind(this)}
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
  status: PropTypes.oneOf([ OK, FAIL, LOADING, STILL ]).isRequired,
}

const mapStateToProps = state => ({
  location: state.location.courseTitle,
  status: state.posts.status
});

const mapDispatchToProps = dispatch => ({
  onLoadPost: () => dispatch(fetchPostsSafe())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
