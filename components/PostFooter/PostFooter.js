import React, { Component } from 'react';
import { Share } from 'react-native';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from 'native-base';

import { deepLink } from 'hkufui/config';

class PostFooter extends Component {
  async _share() {
    const { sharePayload } = this.props;
    try {
      const result = await Share.share({
        message: `${deepLink.prefix}${deepLink.post(sharePayload)}`
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      return;
    }
  }

  render() {
    const { firstPage, lastPage, onPageChangeThunk, onRefresh, enableRefresh } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button transparent={firstPage} disabled={firstPage} onPress={onPageChangeThunk(-1)}>
            <Icon name="arrow-left" type="MaterialCommunityIcons" />
          </Button>
          <Button onPress={onRefresh} transparent={!enableRefresh} disabled={!enableRefresh} >
            <Icon name="refresh" type="MaterialCommunityIcons" />
          </Button>
          <Button>
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
  enableRefresh: PropTypes.bool,
  sharePayload: PropTypes.string
}

export default PostFooter;
