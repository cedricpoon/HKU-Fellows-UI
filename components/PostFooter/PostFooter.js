import React, { Component } from 'react';
import { Share } from 'react-native';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from 'native-base';

import { deepLink } from 'hkufui/config';
import appString from 'hkufui/app.json';

class PostFooter extends Component {
  async _share() {
    const { sharePayload, title, subtitle } = this.props;
    const _subtitle = subtitle ? ` · ${subtitle}` : '';
    try {
      await Share.share({
        message: `[${appString.displayName}]\n${title}${_subtitle}\n${deepLink.prefix}${deepLink.post(sharePayload)}`
      })
    } catch (error) {
      return;
    }
  }

  render() {
    const { firstPage, lastPage, onPageChangeThunk, onRefresh, enableRefresh, onReply } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button transparent={firstPage} disabled={firstPage} onPress={onPageChangeThunk(-1)}>
            <Icon name="arrow-left" type="MaterialCommunityIcons" />
          </Button>
          <Button onPress={onRefresh} transparent={!enableRefresh} disabled={!enableRefresh} >
            <Icon name="refresh" type="MaterialCommunityIcons" />
          </Button>
          <Button onPress={onReply} transparent={!enableRefresh} disabled={!enableRefresh}>
            <Icon name="comment-text-outline" type="MaterialCommunityIcons" />
          </Button>
          <Button onPress={this._share.bind(this)}>
            <Icon name="share-variant" type="MaterialCommunityIcons" />
          </Button>
          <Button transparent={lastPage} disabled={lastPage} onPress={onPageChangeThunk(1)}>
            <Icon name="arrow-right" type="MaterialCommunityIcons" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

PostFooter.defaultProps = {
  onPageChangeThunk: () => { return null },
  enableRefresh: true
}

PostFooter.propTypes = {
  firstPage: PropTypes.bool,
  lastPage: PropTypes.bool,
  onPageChangeThunk: PropTypes.func,
  onRefresh: PropTypes.func,
  onReply: PropTypes.func,
  enableRefresh: PropTypes.bool,
  sharePayload: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PostFooter;
