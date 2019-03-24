import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header, ComposeForm } from 'hkufui/components';
import ViewMenu from './ViewMenu/ViewMenu';
import { mapLayoutToState } from 'hkufui/components/helper';
import { localize } from 'hkufui/locale';
import { show3s } from 'hkufui/src/toastHelper';
import { classifyQuery } from 'hkufui/src/screens/Preview/helper';
import NavigationService from 'hkufui/src/NavigationService';

const locale = localize({ country: 'hk', language: 'en' });
const alert = (message) => { show3s({ message, type: 'danger' }); }

export class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLayout: { y: 0, height: 0 },
      title: "",
      subtitle: "",
      hashtags: "",
      content: "",
      native: true
    };
    this._openHeaderMenu = this._openHeaderMenu.bind(this);
    this._renderHeaderMenu = this._renderHeaderMenu.bind(this);
    this._renderNewHeaderMenu = this._renderNewHeaderMenu.bind(this);
    this._renderReplyHeaderMenu = this._renderReplyHeaderMenu.bind(this);
    this._handleTextUpdate = this._handleTextUpdate.bind(this);
    this._toggleNativeMode = this._toggleNativeMode.bind(this);
    this._openReplyHeaderMenu = this._openReplyHeaderMenu.bind(this);
  }

  _openHeaderMenu() {
    const { title, content, hashtags, native } = this.state;
    Keyboard.dismiss();
    // compulsory not filled
    if (title === '' || content === '')
      alert(locale['new.noCompulsory']);
    // not a valid hashtag string
    else if (native && hashtags !== '' && classifyQuery(hashtags) === hashtags)
      alert(locale['new.malformedHashtags']);
    else if (native && this._popup)
      this._popup.toggle();
    else
      // directly preview for Moodle
      NavigationService.navigate('ComposePreview', { title, content, native: false });
  }

  _openReplyHeaderMenu() {
    const { content } = this.state;
    const { navigation } = this.props;
    const { title, subtitle, native } = navigation.state.params;

    if (content === '')
      alert(locale['new.noCompulsory']);
    else if (native && this._popup)
      this._popup.toggle();
    else
      // directly preview for Moodle
      NavigationService.navigate('ComposePreview', { reply: true, title, subtitle, content, native: false });
  }

  _handleTextUpdate(name) {
    return (newValue) => {
      this.setState({ [name]: newValue });
    }
  }

  _toggleNativeMode(isNative) {
    this.setState({ native: isNative });
  }

  _renderHeaderMenu({ width, title, subtitle, hashtags, reply }) {
    const { headerLayout, content } = this.state;

    return (
      <ViewMenu
        position={{ x: width, y: headerLayout.y }}
        parentHeight={headerLayout.height}
        onRef={ref => this._popup = ref}
        payload={{ title, subtitle, hashtags, content, reply }}
      />
    );
  }

  _renderReplyHeaderMenu({ width }) {
    const { navigation } = this.props;

    const nTitle = navigation.getParam('title', null);
    const nSubtitle = navigation.getParam('subtitle', null);

    return this._renderHeaderMenu({ width, title: nTitle, subtitle: nSubtitle, reply: true });
  }

  _renderNewHeaderMenu({ width }) {
    const { title, subtitle, hashtags, native } = this.state;
    return this._renderHeaderMenu({
      width,
      title,
      subtitle: native && subtitle !== '' ? subtitle : null,
      hashtags: native && classifyQuery(hashtags) !== hashtags ? classifyQuery(hashtags) : null,
    });
  }

  render() {
    const { location, navigation } = this.props;
    const { width, height } = Dimensions.get("window");

    const nTitle = navigation.getParam('title', null); // Non null == reply
    const nSubtitle = navigation.getParam('subtitle', null);
    const nNative = navigation.getParam('native', null);

    return (
      <Container>
        { !nTitle ? this._renderNewHeaderMenu({ width }) : this._renderReplyHeaderMenu({ width }) }
        <Header
          title={{ context: !nTitle ? locale['new.header'] : locale['new.replyHeader'] }}
          subtitle={{ context: location }}
          rightIcon='eye'
          onRightPress={nTitle ? this._openReplyHeaderMenu : this._openHeaderMenu}
          backable
          animated={false}
          onLayout={mapLayoutToState('headerLayout', this)}
        />
        <ComposeForm
          onTextUpdates={{
            title: !nTitle ? this._handleTextUpdate('title') : null,
            subtitle: !nTitle ? this._handleTextUpdate('subtitle') : null,
            hashtags: !nTitle ? this._handleTextUpdate('hashtags') : null,
            content: this._handleTextUpdate('content')
          }}
          onToggleMode={!nTitle ? this._toggleNativeMode : null}
          replyParams={!nTitle ? null : {
            title: nTitle,
            subtitle: nSubtitle,
            native: nNative
          }}
          screenHeight={height}
        />
      </Container>
    );
  }
}

Compose.propTypes = {
  location: PropTypes.string,
}

const mapStateToProps = state => ({
  location: state.location.courseTitle
});

const mapDispatchToProps = () => ({

})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose));
