import React, { Component } from 'react';
import { Text, View, Content, Icon } from 'native-base';
import PropTypes from "prop-types";
import { format } from 'timeago.js';
import Markdown from 'react-native-markdown-renderer';

import { localize } from 'hkufui/locale';
import { hotPostMinIndex as hot } from 'hkufui/config';
const locale = localize({ language: 'en', country: 'hk' });

import styles from './Styles';

class PostSwipable extends Component {
  render() {
    const { index, selectedAnswer } = this.props;
    const { author, timestamp, content, temperature } = this.props.comment;

    const hotStyle = temperature > hot ? styles.hot : null;

    return (
      <Content style={styles.container}>
        <View style={styles.headline}>
          <View style={styles.leftPanel}>
            <Text style={styles.index}>#{index}</Text>
            <Text style={author ? styles.author : styles.anonymous}>
              {author ? author : locale['comment.anonymousUser']}
            </Text>
            <Text style={styles.date}>· {format(new Date(timestamp))}</Text>
            {selectedAnswer && (<Icon name="checkbox-marked-circle-outline" type="MaterialCommunityIcons" style={styles.solved}/>)}
            {selectedAnswer && (<Text style={styles.solved}>{locale['comment.solved']}</Text>)}
          </View>
          <View style={styles.rightPanel}>
            <Icon style={[styles.temperature, hotStyle]} name="ios-flame" />
            <Text style={[styles.temperature, hotStyle]}>{temperature}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Markdown style={styles}>{content}</Markdown>
        </View>
      </Content>
    );
  }
}

PostSwipable.propTypes = {
  index: PropTypes.number.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired
  }).isRequired,
  selectedAnswer: PropTypes.bool
};

export default PostSwipable;
