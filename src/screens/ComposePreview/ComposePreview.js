import React, { Component } from 'react';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { format } from 'timeago.js';
import PropTypes from 'prop-types';

import { Header, PostSwipable } from 'hkufui/components';
import { localize } from 'hkufui/locale';
import { STILL, LOADING } from 'hkufui/src/constants/loadStatus';
import { show } from 'hkufui/src/toastHelper';

import postStyles from '../Post/Styles';
import styles from './Styles';
import { onCompose, onReply } from './createActions';

const locale = localize({ country: 'hk', language: 'en' });
const alert = (message, duration, success = false) => {
  show({ message, duration, hideButton: duration <= 1000, type: success ? 'success' : null });
}

export class ComposePreview extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', subtitle: null, hashtags: null, content: '', anonymity: false, native: true, reply: false };
    this._composePost = this._composePost.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    // passed props from <ViewMenu />
    if (navigation) {
      const { params: payload } = navigation.state;
      this.setState({ ...payload });
    }
  }

  _composePost() {
    const { onComposeNative, onComposeMoodle, onReplyNative, onReplyMoodle } = this.props;
    const { title, subtitle, hashtags, content, anonymity, native, reply } = this.state;
    if (reply) {
      if (native)
        onReplyNative({ content, anonymity });
      else
        onReplyMoodle({ content });
    } else {
      if (native)
        onComposeNative({ title, subtitle, hashtags, content, anonymity });
      else
        onComposeMoodle({ title, content });
    }
  }

  render() {
    const { title, subtitle, content, anonymity, native, reply } = this.state;
    const { username, status } = this.props;

    return (
      <Container>
        <Header
          title={{
            context: title,
            numberOfLines: 4,
            color: native ? postStyles.nativeTitle.color : postStyles.moodleTitle.color
          }}
          subtitle={subtitle && {
            context: subtitle,
            numberOfLines: 3
          }}
          animated={false}
          backable={status === STILL}
          rightIcon='send'
          rightStyle={styles.send}
          onRightPress={status === STILL ? this._composePost : null}
        />
        <PostSwipable
          comments={status === STILL ? [{
            id: '0'.repeat(64), /* mock of SHA-256 hash */
            author: anonymity ? null : username,
            timestamp: format(Date.now()),
            content: `*{ ${!reply ? locale['new.previewWordings'] : locale['new.replyWordings']} }*\n\n${content}`,
            temperature: 0 /* no temperature at first */
          }] : null}
          native={native}
        />
      </Container>
    );
  }
}

ComposePreview.propTypes = {
  username: PropTypes.string,
  onComposeNative: PropTypes.func.isRequired,
  onComposeMoodle: PropTypes.func.isRequired,
  onReplyNative: PropTypes.func.isRequired,
  onReplyMoodle: PropTypes.func.isRequired,
  status: PropTypes.oneOf([ STILL, LOADING ])
}

const mapStateToProps = state => ({
  username: state.credential.userId,
  status: state.compose.status
});

const mapDispatchToProps = dispatch => ({
  onComposeNative: ({ title, subtitle, hashtags, content, anonymity }) => {
    dispatch(onCompose({
      payload: {
        title, subtitle, content, anonymous: anonymity ? '1' : '0',
        hashtag: hashtags && encodeURI(JSON.stringify(hashtags))
      },
      alert, native: true
    }));
  },
  onComposeMoodle: ({ title, content }) => {
    dispatch(onCompose({
      payload: { title, content },
      alert, native: false
    }));
  },
  onReplyNative: ({ content, anonymity }) => {
    dispatch(onReply({
      payload: { content, anonymous: anonymity ? '1' : '0' },
      alert, native: true
    }));
  },
  onReplyMoodle: ({ content }) => {
    dispatch(onReply({
      payload: { content },
      alert, native: false
    }));
  }
})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposePreview));
