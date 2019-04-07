import React, { Component } from 'react';
import { Linking, Alert, Clipboard } from 'react-native';
import { Icon, Text, Separator } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PopupMenu, PopupMenuItem } from 'hkufui/components';

import { localize } from 'hkufui/locale';
import themeStyles from 'hkufui/theme/Styles';
import { email } from 'hkufui/config';
const locale = localize({ language: 'en', country: 'hk' });
import { show2s } from 'hkufui/src/toastHelper';
import { OK, LOADING } from 'hkufui/src/constants/loadStatus';

import { onVote, onNotify, onAccept } from '../viewActions';
import styles from './Styles';

const alert = (message) => { show2s({ message }); }

export class PostHeaderMenu extends Component {
  constructor(props) {
    super(props);
  }

  _voteUp = () => {
    const { onVote, postId, topicId } = this.props;
    onVote({ postId, topicId, value: +1 });
  }

  _voteDown = () => {
    const { onVote, postId, topicId } = this.props;
    onVote({ postId, topicId, value: -1 });
  }

  _enableNotification = () => {
    const { onNotify, topicId } = this.props;
    onNotify({ topicId });
  }

  _reportAbuse = () => {
    const { address, subject, template, ref } = email;
    const { postId, uid } = this.props;
    // open mail app to report
    Linking.openURL(`mailto:${address}?subject=${subject}&body=${template(uid, postId)}`)
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

  _transitLastPage = () => {
    const { onGotoLast } = this.props;
    onGotoLast();
    this._popup.toggle();
  }

  _acceptAnswer = () => {
    const { onAccept, postId, topicId } = this.props;
    onAccept({ postId, topicId });
  }

  render() {
    const { onRef, index, solved, native, owned, onGotoLast, subscribed, status, ...restProps } = this.props;

    return(
      <PopupMenu
        ref={ref => { this._popup = ref; onRef(ref); }}
        { ...restProps } /* Proptypes handling on <PopupMenu /> */
      >
        {native && (
          <PopupMenuItem transparent iconLeft onPress={this._voteUp} disabled={status !== OK}>
            <Icon name="thumb-up" type="MaterialCommunityIcons" style={[themeStyles.icon, styles.thumbUp]}></Icon>
            <Text style={styles.text}>{locale['header.thumbUp'](index)}</Text>
          </PopupMenuItem>
        )}
        {native && (
          <PopupMenuItem transparent iconLeft onPress={this._voteDown} disabled={status !== OK}>
            <Icon name="thumb-down" type="MaterialCommunityIcons" style={[themeStyles.icon, styles.thumbDown]}></Icon>
            <Text style={styles.text}>{locale['header.thumbDown'](index)}</Text>
          </PopupMenuItem>
        )}
        {native && owned && (
          <PopupMenuItem transparent iconLeft warning disabled={solved || status !== OK} onPress={this._acceptAnswer}>
            <Icon name="checkbox-marked-circle-outline" type="MaterialCommunityIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.solved']}</Text>
          </PopupMenuItem>
        )}
        {native && (
          <Separator style={styles.separator} />
        )}
        {native && (
          <PopupMenuItem transparent iconLeft onPress={this._enableNotification} disabled={status !== OK}>
            <Icon
              name={subscribed ? "notifications-off" : "notifications-active"}
              type="MaterialIcons"
              style={[themeStyles.icon, styles.text]}
            />
            <Text style={styles.text}>
              {subscribed ? locale['header.unsubscribe'] : locale['header.subscribe']}
            </Text>
          </PopupMenuItem>
        )}
        <PopupMenuItem transparent iconLeft onPress={this._transitLastPage} disabled={onGotoLast === null}>
          <Icon
            name="last-page"
            type="MaterialIcons"
            style={onGotoLast !== null ? [themeStyles.icon, styles.text] : null}
          />
          <Text style={onGotoLast !== null ? styles.text : null}>{locale['header.gotoLast']}</Text>
        </PopupMenuItem>
        <PopupMenuItem transparent iconLeft danger onPress={this._reportAbuse}>
          <Icon name="report" type="MaterialIcons" style={themeStyles.icon}></Icon>
          <Text>{locale['header.abuse']}</Text>
        </PopupMenuItem>
      </PopupMenu>
    );
  }
}

PostHeaderMenu.propTypes = {
  postId: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  onRef: PropTypes.func,
  native: PropTypes.bool,
  index: PropTypes.number.isRequired,
  solved: PropTypes.bool,
  owned: PropTypes.bool,
  subscribed: PropTypes.bool,
  onVote: PropTypes.func,
  onAccept: PropTypes.func,
  onNotify: PropTypes.func,
  onGotoLast: PropTypes.func,
  status: PropTypes.oneOf([OK, LOADING]),
}

const mapDispatchToProps = dispatch => ({
  onVote: ({ postId, topicId, value }) => dispatch(onVote({ postId, topicId, value, alert })),
  onNotify: ({ topicId }) => dispatch(onNotify({ topicId, alert })),
  onAccept: ({ topicId, postId }) => dispatch(onAccept({ topicId, postId, alert }))
});

const mapStateToProps = state => {
  // eslint-disable-next-line no-unused-vars
  const { solved, title, subtitle, ...restTopicInfo } = state.replies.topicInfo;
  return {
    uid: state.credential.userId,
    solved: solved != null,
    ...restTopicInfo,
    topicId: state.location.recentTopic,
    status: state.replies.status,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeaderMenu);
