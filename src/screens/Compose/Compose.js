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
    this._handleTextUpdate = this._handleTextUpdate.bind(this);
    this._toggleNativeMode = this._toggleNativeMode.bind(this);
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

  _handleTextUpdate(name) {
    return (newValue) => {
      this.setState({ [name]: newValue });
    }
  }

  _toggleNativeMode(isNative) {
    this.setState({ native: isNative });
  }

  _renderHeaderMenu({ width }) {
    const { headerLayout, title, subtitle, hashtags, content, native } = this.state;

    return (
      <ViewMenu
        position={{ x: width, y: headerLayout.y }}
        parentHeight={headerLayout.height}
        onRef={ref => this._popup = ref}
        native={native}
        payload={{
          title,
          subtitle: native && subtitle !== '' ? subtitle : null,
          hashtags: native && classifyQuery(hashtags) !== hashtags ? classifyQuery(hashtags) : null,
          content
        }}
      />
    );
  }

  render() {
    const { location } = this.props;
    const { width, height } = Dimensions.get("window");

    return (
      <Container>
        { this._renderHeaderMenu({ width }) }
        <Header
          title={{ context: locale['new.header'] }}
          subtitle={{ context: location }}
          rightIcon='eye'
          onRightPress={this._openHeaderMenu}
          backable
          animated={false}
          onLayout={mapLayoutToState('headerLayout', this)}
        />
        <ComposeForm
          onTextUpdates={{
            title: this._handleTextUpdate('title'),
            subtitle: this._handleTextUpdate('subtitle'),
            hashtags: this._handleTextUpdate('hashtags'),
            content: this._handleTextUpdate('content')
          }}
          onToggleMode={this._toggleNativeMode}
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
