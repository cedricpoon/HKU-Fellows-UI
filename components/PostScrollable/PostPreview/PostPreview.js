import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { ListItem, Left, Body, Right, Text, View, Icon } from 'native-base';
import { format } from 'timeago.js';

import NavigationService from 'hkufui/src/NavigationService';
import { localize } from 'hkufui/locale';
import { hotPostMinIndex as hot } from 'hkufui/config';
import styles from './Styles';

const locale = localize({ language: 'en', country: 'hk' });

class PostPreview extends PureComponent {

  _onPress() {
    /* dive into post with all props */
    NavigationService.navigate('Post', {
      ...this.props
    });
  }

  render() {
    const {
      native,
      solved,
      primaryHashtag,
      secondaryHashtag,
      timestamp,
      replyNo,
      temperature,
      title,
      subTitle,
      viewed
    } = this.props;

    return(
      <ListItem avatar style={styles.noMarginLeft} onPress={this._onPress.bind(this)}>
        <Left style={styles.badgeContainer}>
          {native && solved && (
            <Icon style={[styles.badge, styles.solved]} type="MaterialCommunityIcons" name="checkbox-marked-circle-outline" />
          )}
          {native && viewed && (
            <Icon style={[styles.badge, styles.viewed]} type="MaterialCommunityIcons" name="history" />
          )}
        </Left>
        <Body style={styles.noMarginLeft}>
          <View style={[styles.infoBar]}>
            <Text style={[styles.subText, native ? styles.hashtags : styles.moodle]}>
              {native ?
                `#${primaryHashtag}` + (secondaryHashtag ? ` #${secondaryHashtag}` : '')
                :
                locale['post.moodle']
              }
            </Text>
            <Right style={[styles.right, styles.infoBar]}>
              <Icon style={[styles.subText, styles.note]} name="md-time" />
              <Text note style={styles.subText}>{format(timestamp)}</Text>
              <Icon style={[styles.subText, styles.note]} type="Entypo" name="chat" />
              <Text note style={styles.subText}>{replyNo}</Text>
              <Icon style={[styles.subText, temperature > hot && styles.active]} name="ios-flame" />
              <Text style={[styles.subText, styles.last, temperature > hot && styles.active]}>{native ? temperature : 0}</Text>
            </Right>
          </View>
          <Text style={styles.mainText} numberOfLines={1}>{title}</Text>
          <Text
            style={subTitle ? styles.subTitle : styles.noSubtitle}
            note
            numberOfLines={1}
          >
            {subTitle ? subTitle : locale['post.noSubtitle']}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

PostPreview.propTypes = {
  id: PropTypes.string.isRequired,
  native: PropTypes.bool.isRequired,
  solved: PropTypes.bool,
  viewed: PropTypes.bool,
  primaryHashtag: PropTypes.string,
  secondaryHashtag: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  replyNo: PropTypes.number.isRequired,
  temperature: PropTypes.number,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
}

export default PostPreview;
