import React, { Component } from 'react';
import { Dimensions } from 'react-native';
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

import { onLoad, onClear, onRefresh } from './viewActions';
import styles from './Styles';

const alert = (message) => { show1s({ message }); }
const alertSuccess = (message) => { show1s({ message, type: 'success' }); }

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      currentPage: 0,
      headerLayout: { y: 0, height: 0 }
    };
    this._openHeaderMenu = this._openHeaderMenu.bind(this);
    this._renderHeaderMenu = this._renderHeaderMenu.bind(this);
    this._onPostTabChange = this._onPostTabChange.bind(this);
  }

  _openHeaderMenu() {
    if (this._popup)
      this._popup.toggle();
  }

  _renderHeaderMenu() {
    const { comments } = this.props;
    const { headerLayout, native, solved, currentPage, id } = this.state;
    const { width } = Dimensions.get("window");

    if (comments && id)
      return (
        <PostHeaderMenu
          topicId={id}
          postId={comments[currentPage].id}
          position={{ x: width, y: headerLayout.y }}
          parentHeight={headerLayout.height}
          onRef={ref => this._popup = ref}
          native={native}
          solved={solved != null}
          index={currentPage + 1}
        />
      );
    else
      return null;
  }

  _onPostTabChange({i}) {
    this.setState({ currentPage: i });
  }

  componentDidMount() {
    const { navigation, onLoadReplies, decryptor } = this.props;
    /* all props from <PostPreview /> has been passed */
    if (navigation) {
      const { params } = navigation.state;
      /* parse from deep linking */
      let payload;
      try {
        payload = params && params.payload ? decryptor(params.payload) : params;
      } catch (e) {
        NavigationService.goBack();
      }
      this.setState({
        ...payload
      });
      // start loading replies
      onLoadReplies(params.id);
    }
  }

  render() {
    const { id, title, subtitle, native, solved, currentPage } = this.state;
    const { comments, onRefreshReplies, loadStatus, credential, encryptor } = this.props;

    /* unauthorized deep link */
    if (!credential) {
      NavigationService.goBack();
      return null;
    }
    /* construct share payload */
    const sharePayload = { id, title, subtitle, native, solved };

    return (
      <Container>
        {comments && this._renderHeaderMenu()}
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
              return () => { this._postTabs.goToPage(currentPage + i) };
          }}
          onRefresh={() => { onRefreshReplies(id) }}
          enableRefresh={loadStatus === _loadStatus.OK}
          sharePayload={encryptor(sharePayload)}
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
  onLoadReplies: PropTypes.func,
  onRefreshReplies: PropTypes.func,
  credential: PropTypes.object,
  loadStatus: PropTypes.oneOf(Object.values(_loadStatus)),
  encryptor: PropTypes.func.isRequired,
  decryptor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comments: state.replies.replies,
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
