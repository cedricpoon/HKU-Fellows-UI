import React, { Component } from 'react';
import { Linking, Alert, Clipboard } from 'react-native';
import { Button, Icon, Text, Separator } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PopupMenu } from 'hkufui/components';

import { localize } from 'hkufui/locale';
import themeStyles from 'hkufui/theme/Styles';
import { email } from 'hkufui/config';
const locale = localize({ language: 'en', country: 'hk' });

import { onVote, onNotify, onAccept } from '../viewActions';
import styles from './Styles';

export class PostHeaderMenu extends Component {
  constructor(props) {
    super(props);

    this._voteUp = this._voteUp.bind(this);
    this._voteDown = this._voteDown.bind(this);
    this._enableNotification = this._enableNotification.bind(this);
    this._acceptAnswer = this._acceptAnswer.bind(this);
    this._reportAbuse = this._reportAbuse.bind(this);
  }

  _voteUp() {
    const { onVote, postId, topicId } = this.props;
    onVote({ postId, topicId, value: +1 });
  }

  _voteDown() {
    const { onVote, postId, topicId } = this.props;
    onVote({ postId, topicId, value: -1 });
  }

  _enableNotification() {
    const { onNotify, topicId } = this.props;
    onNotify({ topicId });
  }

  _reportAbuse() {
    const { address, subject, template, ref } = email;
    const { postId } = this.props;
    // open mail app to report
    Linking.openURL(`mailto:${address}?subject=${subject}&body=${template(postId)}`)
      .catch(() => {
        Alert.alert(
          locale['alert.noEmailTitle'],
          locale['alert.noEmailContent'](address, ref(postId)),
          [
            {text: locale['alert.copy'], onPress: () => Clipboard.setString(`${address} - ${ref(postId)}`)},
            {text: locale['toast.dismiss']}
          ]
        );
      });
  }

  _acceptAnswer() {
    const { onAccept, postId, topicId } = this.props;
    onAccept({ postId, topicId });
  }

  render() {
    const { onRef, index, solved, native, ...restProps } = this.props;

    return(
      <PopupMenu
        ref={onRef}
        { ...restProps } /* Proptypes handling on <PopupMenu /> */
      >
        {native && (
          <Button transparent iconLeft light onPress={this._voteUp}>
            <Icon name="thumb-up" type="MaterialCommunityIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.thumbUp'](index)}</Text>
          </Button>
        )}
        {native && (
          <Button transparent iconLeft light onPress={this._voteDown}>
            <Icon name="thumb-down" type="MaterialCommunityIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.thumbDown'](index)}</Text>
          </Button>
        )}
        {native && (
          <Button transparent iconLeft warning disabled={solved} onPress={this._acceptAnswer}>
            <Icon name="checkbox-marked-circle-outline" type="MaterialCommunityIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.solved']}</Text>
          </Button>
        )}
        {native && (
          <Separator style={styles.separator} />
        )}
        {native && (
          <Button transparent iconLeft light onPress={this._enableNotification}>
            <Icon name="notifications" type="MaterialIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.notifications']}</Text>
          </Button>
        )}
        <Button transparent iconLeft danger onPress={this._reportAbuse}>
          <Icon name="report" type="MaterialIcons" style={themeStyles.icon}></Icon>
          <Text>{locale['header.abuse']}</Text>
        </Button>
      </PopupMenu>
    );
  }
}

PostHeaderMenu.propTypes = {
  postId: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  onRef: PropTypes.func,
  native: PropTypes.bool,
  index: PropTypes.number.isRequired,
  solved: PropTypes.bool,
  onVote: PropTypes.func,
  onAccept: PropTypes.func,
  onNotify: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  onVote: ({ postId, topicId, value }) => dispatch(onVote({ postId, topicId, value })),
  onNotify: ({ topicId }) => dispatch(onNotify({ topicId })),
  onAccept: ({ topicId, postId }) => dispatch(onAccept({ topicId, postId }))
});

export default connect(
  null,
  mapDispatchToProps
)(PostHeaderMenu);
