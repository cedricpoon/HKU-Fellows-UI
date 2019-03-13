import React, { Component } from 'react';
import { Dimensions, Linking, Keyboard } from 'react-native';
import { Container, Content, Form, Textarea, Item, Input, Text, View } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from 'hkufui/components';
import ViewMenu from './ViewMenu/ViewMenu';
import { mapLayoutToState } from 'hkufui/components/helper';
import { localize } from 'hkufui/locale';
import styles from './Styles';
import { markdownTutorialLink } from 'hkufui/config';
import { show3s } from 'hkufui/src/toastHelper';
import { classifyQuery } from 'hkufui/src/screens/Preview/helper';

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
      content: ""
    };
    this._openHeaderMenu = this._openHeaderMenu.bind(this);
    this._renderHeaderMenu = this._renderHeaderMenu.bind(this);
    this._handleTextUpdate = this._handleTextUpdate.bind(this);
  }

  _openHeaderMenu() {
    const { title, content, hashtags } = this.state;
    Keyboard.dismiss();
    // compulsory not filled
    if (title === '' || content === '')
      alert(locale['new.noCompulsory']);
    // not a valid hashtag string
    else if (hashtags !== '' && classifyQuery(hashtags) === hashtags)
      alert(locale['new.malformedHashtags']);
    else if (this._popup)
      this._popup.toggle();
  }

  _handleTextUpdate(name) {
    return (newValue) => {
      this.setState({ [name]: newValue });
    }
  }

  _renderHeaderMenu({ width }) {
    const { headerLayout, title, subtitle, hashtags, content } = this.state;

    return (
      <ViewMenu
        position={{ x: width, y: headerLayout.y }}
        parentHeight={headerLayout.height}
        onRef={ref => this._popup = ref}
        payload={{
          title,
          subtitle: subtitle !== '' ? subtitle : null,
          hashtags: classifyQuery(hashtags) !== hashtags ? classifyQuery(hashtags) : null,
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
        <Content padder>
          <Form>
            <Item regular>
              <Input placeholder={locale['new.title']} style={styles.textbox} onChangeText={this._handleTextUpdate('title')} />
            </Item>
            <Item regular style={styles.item}>
              <Input placeholder={locale['new.subtitle']} style={styles.textbox} onChangeText={this._handleTextUpdate('subtitle')} />
            </Item>
            <Item regular style={styles.item}>
              <Input placeholder={locale['new.hashtags']} style={styles.textbox} onChangeText={this._handleTextUpdate('hashtags')} />
            </Item>
            <Textarea
              bordered
              placeholder={locale['new.content']}
              style={{ height: height / 3 }}
              onChangeText={this._handleTextUpdate('content')}
            />
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
