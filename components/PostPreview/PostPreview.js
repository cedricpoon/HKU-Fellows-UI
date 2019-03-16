import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { ListItem, Left, Body, Right, Text, View, Icon } from 'native-base';
import { format } from 'timeago.js';

import NavigationService from 'hkufui/src/NavigationService';
import { localize } from 'hkufui/locale';
import { hotPostMinIndex as hot } from 'hkufui/config';
import styles from './Styles';
import { noZ } from '../helper';

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
      subtitle,
      viewed
    } = this.props;
    let hashtagText;
    if (native) {
      if (primaryHashtag || secondaryHashtag)
        hashtagText = `#${primaryHashtag}` + (secondaryHashtag ? ` #${secondaryHashtag}` : '');
      else
        hashtagText = locale['post.noHashtags'];
    } else
      hashtagText = locale['post.moodle'];

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
              {hashtagText}
            </Text>
            <Right style={[styles.right, styles.infoBar]}>
              <Icon style={[styles.subText, styles.note]} name="md-time" />
              <Text note style={styles.subText}>{format(noZ(timestamp))}</Text>
              <Icon style={[styles.subText, styles.note]} type="Entypo" name="chat" />
              <Text note style={styles.subText}>{replyNo}</Text>
              <Icon style={[styles.subText, temperature > hot && styles.active]} name="ios-flame" />
              <Text style={[styles.subText, styles.last, temperature > hot && styles.active]}>{native ? temperature : 0}</Text>
            </Right>
          </View>
          <Text style={styles.mainText} numberOfLines={1}>{title}</Text>
          <Text
            style={subtitle ? styles.subtitle : styles.noSubtitle}
            note
            numberOfLines={1}
          >
            {subtitle ? subtitle : locale['post.noSubtitle']}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

PostPreview.propTypes = {
  id: PropTypes.string.isRequired,
  native: PropTypes.bool.isRequired,
  solved: PropTypes.string,
  viewed: PropTypes.bool,
  primaryHashtag: PropTypes.string,
  secondaryHashtag: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  replyNo: PropTypes.number.isRequired,
  temperature: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default PostPreview;
