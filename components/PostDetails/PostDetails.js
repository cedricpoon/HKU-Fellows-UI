import React, { Component } from 'react';
import { Text, View, Content } from 'native-base';
import PropTypes from "prop-types";
import { format } from 'timeago.js';
import Markdown from 'react-native-markdown-renderer';

import { localize } from 'hkufui/locale';
const locale = localize({ language: 'en', country: 'hk' });

import styles from './Styles';

class PostSwipable extends Component {
  render() {
    const { index } = this.props;
    const { author, timestamp, content } = this.props.comment;

    return (
      <Content style={styles.container}>
        <View style={styles.headline}>
          <Text style={styles.index}>#{index}</Text>
          <Text style={author ? styles.author : styles.anonymous}>
            {author ? author : locale['comment.anonymousUser']}
          </Text>
          <Text style={styles.date}>· {format(new Date(timestamp))}</Text>
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
    content: PropTypes.string.isRequired
  }).isRequired
};

export default PostSwipable;
