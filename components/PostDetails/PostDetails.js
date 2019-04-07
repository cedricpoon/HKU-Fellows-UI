import React, { Component } from 'react';
import { Text, View, Content, Icon } from 'native-base';
import { TouchableOpacity, TextInput, Platform } from 'react-native';
import PropTypes from "prop-types";
import { format } from 'timeago.js';
import Markdown from 'react-native-markdown-renderer';

import { localize } from 'hkufui/locale';
import { hotPostMinIndex as hot } from 'hkufui/config';
import styles from './Styles';
import { noZ, makeAnimatable } from '../helper';
import { FADE_IN_DURATION } from 'hkufui/components/Constants'

const AnimatingView = makeAnimatable(View);
const locale = localize({ language: 'en', country: 'hk' });

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { raw: false }
  }

  _toggleRaw = () => {
    this.setState({ raw: !this.state.raw });
  }

  render() {
    const { index, selectedAnswer, markdownRenderer } = this.props;
    const { author, timestamp, content, temperature } = this.props.comment;
    const { raw } = this.state;

    const hotStyle = temperature && temperature > hot ? styles.hot : null;
    const context = raw ?
      (<View style={styles.contentContainer}>
        {
          Platform.OS === 'android'
            ? selectableTextRenderer(content)
            : selectableTextInputRenderer(content)
        }
      </View>)
    :
      (<TouchableOpacity
        style={styles.contentContainer}
        onLongPress={this._toggleRaw}
        activeOpacity={0.5}
      >
        {markdownRenderer(content, styles)}
      </TouchableOpacity>)
    ;

    return (
      <Content style={styles.container}>
        {!raw ? (
          <AnimatingView animation='fadeIn' duration={FADE_IN_DURATION} style={styles.headline}>
            <View style={styles.leftPanel}>
              <Text style={styles.index}>#{index}</Text>
              <Text style={author ? styles.author : styles.anonymous}>
                {author ? author : locale['replies.anonymousUser']}
              </Text>
              <Text style={styles.date}>· {format(noZ(timestamp))}</Text>
              {selectedAnswer && (<Icon name="checkbox-marked-circle-outline" type="MaterialCommunityIcons" style={styles.solved}/>)}
              {selectedAnswer && (<Text style={styles.solved}>{locale['replies.solved']}</Text>)}
            </View>
            {temperature != null && (
              <View style={styles.rightPanel}>
                <Icon style={[styles.temperature, hotStyle]} name="ios-flame" />
                <Text style={[styles.temperature, hotStyle]}>{temperature}</Text>
              </View>
            )}
          </AnimatingView>
        ) : (
          <View style={styles.headline}>
            <TouchableOpacity
              onPress={this._toggleRaw}
            >
              <AnimatingView animation='fadeIn' duration={FADE_IN_DURATION} style={styles.leftPanel}>
                <Icon style={[styles.dismiss, styles.temperature]} name="close" type="MaterialIcons" />
                <Text style={[styles.dismiss]}>{locale['replies.noRaw']}</Text>
              </AnimatingView>
            </TouchableOpacity>
          </View>
        )}
        <AnimatingView animation='fadeIn' duration={FADE_IN_DURATION}>
          {context}
        </AnimatingView>
      </Content>
    );
  }
}

const selectableTextInputRenderer = (content) => {
  return (
    <TextInput
      style={styles.selectableText}
      multiline={true}
      editable={false}
      scrollEnabled={false}
    >
      {content}
    </TextInput>
  );
}

const selectableTextRenderer = (content) => {
  return (
    <Text style={styles.selectableText} selectable={true}>{content}</Text>
  );
}

const defaultMarkdownRenderer = (content, styles) => {
  return <Markdown style={styles}>{content}</Markdown>;
}

PostDetails.defaultProps = {
  markdownRenderer: defaultMarkdownRenderer
};

PostDetails.propTypes = {
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

export default PostDetails;
