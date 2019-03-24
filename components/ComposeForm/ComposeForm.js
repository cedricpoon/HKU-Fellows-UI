import React, { PureComponent } from 'react';
import { Linking } from 'react-native';
import { Content, Form, Item, Input, Textarea, Button, Text, View } from 'native-base';
import PropTypes from 'prop-types';

import { markdownTutorialLink } from 'hkufui/config';
import { localize } from 'hkufui/locale';
import styles from './Styles';

const locale = localize({ country: 'hk', language: 'en' });

class ComposeForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isNative: true };
    this._toggleUploadMode = this._toggleUploadMode.bind(this);
  }

  _toggleUploadMode() {
    const { onToggleMode } = this.props;
    this.setState(prevState => {
      onToggleMode(!prevState.isNative);
      return ({ isNative: !prevState.isNative });
    });
  }

  render() {
    const { onTextUpdates, screenHeight, onToggleMode, replyParams } = this.props;
    const { isNative } = this.state;

    return (
      <Content padder>
        <Form>
          <Item regular style={replyParams && styles.replybox}>
            <Input
              placeholder={locale['new.title']}
              style={[styles.textbox, replyParams && styles.bold]}
              onChangeText={onTextUpdates.title}
              disabled={replyParams != null}
              value={replyParams ? `${locale['reply.titlePrefix']}${replyParams.title}` : null}
            />
          </Item>
          <Item regular style={[styles.item, !isNative && styles.hidden, replyParams && styles.replybox]}>
            <Input
              placeholder={!replyParams ? locale['new.subtitle'] : locale['post.noSubtitle']}
              style={styles.textbox}
              onChangeText={onTextUpdates.subtitle}
              disabled={replyParams != null}
              value={replyParams ? replyParams.subtitle : null}
            />
          </Item>
          {!replyParams && (
            <Item regular style={[styles.item, !isNative && styles.hidden]}>
              <Input placeholder={locale['new.hashtags']} style={styles.textbox} onChangeText={onTextUpdates.hashtags} />
            </Item>
          )}
          <Textarea
            bordered
            placeholder={locale['new.content']}
            style={[{ height: screenHeight / 3 }, styles.item]}
            onChangeText={onTextUpdates.content}
          />
          {onToggleMode && (
            <Button full dark={!isNative} light={isNative} style={styles.item} onPress={this._toggleUploadMode}>
              <Text style={styles.toggler}>{isNative ? 'As Native Post' : 'As Moodle Forum Post'}</Text>
            </Button>
          )}
        </Form>
        <View style={styles.remarkGroup}>
          <Text style={styles.remark} note>
            {locale['new.markdownRemark']}
          </Text>
          <Text
            style={[styles.remark, styles.hyperlink]}
            onPress={() => Linking.openURL(markdownTutorialLink)}
          >
            {locale['new.markdown']}
          </Text>
        </View>
      </Content>
    );
  }
}

ComposeForm.defaultProps = {
  onTextUpdates: {}
}

ComposeForm.propTypes = {
  onTextUpdates: PropTypes.shape({
    title: PropTypes.func,
    subtitle: PropTypes.func,
    hashtags: PropTypes.func,
    content: PropTypes.func
  }),
  onToggleMode: PropTypes.func,
  screenHeight: PropTypes.number.isRequired,
  replyParams: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    native: PropTypes.bool
  })
}

export default ComposeForm;
