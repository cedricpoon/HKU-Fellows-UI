import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostHeaderMenu from './PostHeaderMenu/PostHeaderMenu';
import { mapLayoutToState } from 'hkufui/components/helper';
import NavigationService from 'hkufui/src/NavigationService';
import * as _loadStatus from 'hkufui/src/constants/loadStatus';
import { Header, PostFooter, PostSwipable } from 'hkufui/components';
import { show1s } from 'hkufui/src/toastHelper';
import { encrypt, decrypt } from 'hkufui/src/safe';
import defaultState from 'hkufui/src/store/globalState';

import { onLoad, onClear, onRefresh } from './viewActions';
import styles from './Styles';

const alert = (message) => { show1s({ message }); }
const alertSuccess = (message) => { show1s({ message, type: 'success' }); }
const defaultTopicInfo = defaultState.replies.topicInfo;

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      status: _loadStatus.STILL,
      currentPage: 0,
      headerLayout: { y: 0, height: 0 }
    };
  }

  _openHeaderMenu = () => {
    if (this._popup)
      this._popup.toggle();
  }

  _renderHeaderMenu = () => {
    const { comments } = this.props;
    const { headerLayout, currentPage } = this.state;
    const { width } = Dimensions.get("window");

    return (
      <PostHeaderMenu
        postId={comments[currentPage].id}
        position={{ x: width, y: headerLayout.y }}
        parentHeight={headerLayout.height}
        onRef={ref => this._popup = ref}
        onGotoLast={comments.length - 1 === currentPage ? null : this._gotoLastPage}
        index={currentPage + 1}
      />
    );
  }

  _gotoLastPage = () => {
    const { comments } = this.props;
    this._postTabs.goToPage(comments.length - 1);
  }

  _gotoFirstPage = () => {
    this._postTabs.goToPage(0);
  }

  _onPostTabChange = ({i}) => {
    this.setState({ currentPage: i });
  }

  _reply = () => {
    const { topicInfo } = this.props;
    const { title, subtitle, native } = topicInfo;

    NavigationService.navigate('Compose', { title, subtitle, native });
  }

  componentDidMount() {
    const { navigation, onLoadReplies, decryptor } = this.props;
    // all props from <PostPreview /> has been passed
    if (navigation) {
      const { params } = navigation.state;
      // parse from deep linking
      let payload;
      try {
        payload = params && params.payload ? { id: decryptor(params.payload) } : params;

        const { id, title, subtitle, native } = payload;
        const extraInfo = title ? { title, subtitle, native } : null
        this.setState({ id, extraInfo });
        // start loading replies
        onLoadReplies(payload.id);
      } catch (e) {
        NavigationService.goBack();
      }
    }
  }

  componentDidUpdate() {
    const { STILL, OK } = _loadStatus;
    if (this.state.status === STILL && this.props.loadStatus === OK)
      this.setState({ status: OK });
  }

  render() {
    const { id, currentPage, status, extraInfo } = this.state;
    const { comments, onRefreshReplies, loadStatus, credential, encryptor, topicInfo } = this.props;
    const { title, subtitle, native, solved } = status !== _loadStatus.STILL ? topicInfo : extraInfo || defaultTopicInfo;

    // unauthorized deep link
    if (!credential || loadStatus === _loadStatus.FAIL) {
      NavigationService.goBack();
      return null;
    }

    return (
      <Container>
        {Platform.OS === 'ios' && comments && id ? this._renderHeaderMenu() : null}
        <Header
          title={{
            context: title,
            numberOfLines: 4,
            color: native ? styles.nativeTitle.color : styles.moodleTitle.color
          }}
          subtitle={subtitle && {
            context: subtitle,
            numberOfLines: 3
          }}
          animated={false}
          backable
          rightIcon={comments ? 'more' : null}
          onRightPress={this._openHeaderMenu}
          onLayout={mapLayoutToState('headerLayout', this)}
        />
        {Platform.OS === 'android' && comments && id ? this._renderHeaderMenu() : null}
        <PostSwipable
          comments={comments}
          onChangeTab={this._onPostTabChange}
          onRef={ref => this._postTabs = ref}
          solved={solved}
        />
        <PostFooter
          firstPage={!comments || currentPage === 0}
          lastPage={!comments || currentPage === comments.length - 1 || comments.length === 0}
          onPageChangeThunk={(i) => {
            if (this._postTabs)
              return () => { switch (i) {
                case 2:  this._gotoLastPage(); break;
                case -2: this._gotoFirstPage(); break;
                default: this._postTabs.goToPage(currentPage + i); break;
              }};
          }}
          onRefresh={() => { onRefreshReplies(id) }}
          onReply={this._reply}
          enableRefresh={loadStatus === _loadStatus.OK}
          sharePayload={encryptor(id)}
          title={title}
          subtitle={subtitle}
        />
      </Container>
    );
  }
}

Post.defaultProps = {
  encryptor: encrypt,
  decryptor: decrypt
};

Post.propTypes = {
  comments: PropTypes.array,
  topicInfo: PropTypes.object,
  onLoadReplies: PropTypes.func,
  onRefreshReplies: PropTypes.func,
  credential: PropTypes.object,
  loadStatus: PropTypes.oneOf(Object.values(_loadStatus)),
  encryptor: PropTypes.func.isRequired,
  decryptor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comments: state.replies.replies,
  topicInfo: state.replies.topicInfo,
  loadStatus: state.replies.status,
  credential: state.credential
});

const mapDispatchToProps = dispatch => ({
  onLoadReplies: (id) => {
    dispatch(onClear());
    dispatch(onLoad({ id }));
  },
  onRefreshReplies: (id) => {
    dispatch(onRefresh({ alert }));
    dispatch(onLoad({ id, alert: alertSuccess }));
  }
})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));
