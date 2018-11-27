import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  PreviewFooter,
  PreviewHeader,
} from 'hkufui/components';

import PostPreviewLoader from './PostPreviewLoader/PostPreviewLoader'

export class Preview extends Component {

  render() {
    const { location } = this.props;

    return (
      <Container>
        <PreviewHeader location={location} />
        <Content>
          <PostPreviewLoader />
        </Content>
        <PreviewFooter muted={location === ''} />
      </Container>
    );
  }
}

/* Mocking mapStateToProps */
Preview.defaultProps = {
  location: ''
}

Preview.propTypes = {
  location: PropTypes.string
}

const mapStateToProps = state => ({
  location: state.location.courseTitle
});

export default connect(
  mapStateToProps
)(Preview);
