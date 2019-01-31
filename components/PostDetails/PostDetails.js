import React, { Component } from 'react';
import { Text, View, Content, Icon } from 'native-base';
import PropTypes from "prop-types";
import { format } from 'timeago.js';
import * as Animatable from 'react-native-animatable';
import Markdown from 'react-native-markdown-renderer';

import { localize } from 'hkufui/locale';
import { hotPostMinIndex as hot } from 'hkufui/config';
import styles from './Styles';
import { FADE_IN_DURATION } from 'hkufui/components/Constants'

const AnimatingView = Animatable.createAnimatableComponent(View);
const locale = localize({ language: 'en', country: 'hk' });

class PostSwipable extends Component {
  render() {
    const { index, selectedAnswer, markdownRenderer } = this.props;
    const { author, timestamp, content, temperature } = this.props.comment;

    const hotStyle = temperature && temperature > hot ? styles.hot : null;

    return (
      <Content style={styles.container}>
        <AnimatingView animation='fadeIn' duration={FADE_IN_DURATION}>
          <View style={styles.headline}>
            <View style={styles.leftPanel}>
              <Text style={styles.index}>#{index}</Text>
              <Text style={author ? styles.author : styles.anonymous}>
                {author ? author : locale['replies.anonymousUser']}
              </Text>
              <Text style={styles.date}>· {format(new Date(timestamp))}</Text>
              {selectedAnswer && (<Icon name="checkbox-marked-circle-outline" type="MaterialCommunityIcons" style={styles.solved}/>)}
              {selectedAnswer && (<Text style={styles.solved}>{locale['replies.solved']}</Text>)}
            </View>
            {temperature != null && (
              <View style={styles.rightPanel}>
                <Icon style={[styles.temperature, hotStyle]} name="ios-flame" />
                <Text style={[styles.temperature, hotStyle]}>{temperature}</Text>
              </View>
            )}
          </View>
          <View style={styles.contentContainer}>
            {markdownRenderer(content, styles)}
          </View>
        </AnimatingView>
      </Content>
    );
  }
}

const defaultMarkdownRenderer = (content, styles) => {
  return (<Markdown style={styles}>{content}</Markdown>);
}

PostSwipable.defaultProps = {
  markdownRenderer: defaultMarkdownRenderer
};

PostSwipable.propTypes = {
  index: PropTypes.number.isRequired,
  markdownRenderer: PropTypes.func,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    temperature: PropTypes.number
  }).isRequired,
  selectedAnswer: PropTypes.bool
};

export default PostSwipable;
