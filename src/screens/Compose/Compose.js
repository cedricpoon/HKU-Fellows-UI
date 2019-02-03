import React, { Component } from 'react';
import { Dimensions, Linking } from 'react-native';
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

const locale = localize({ country: 'hk', language: 'en' });

export class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLayout: { y: 0, height: 0 }
    };
    this._openHeaderMenu = this._openHeaderMenu.bind(this);
    this._renderHeaderMenu = this._renderHeaderMenu.bind(this);
  }

  _openHeaderMenu() {
    if (this._popup)
      this._popup.toggle();
  }

  _renderHeaderMenu() {
    const { headerLayout } = this.state;
    const { width } = Dimensions.get("window");

    return (
      <ViewMenu
        position={{ x: width, y: headerLayout.y }}
        parentHeight={headerLayout.height}
        onRef={ref => this._popup = ref}
      />
    );
  }

  render() {
    const { location } = this.props;

    return (
      <Container>
        { this._renderHeaderMenu() }
        <Header
          title={{ context: locale['new.header'] }}
          subtitle={{ context: location }}
          rightIcon='eye'
          onRightPress={this._openHeaderMenu}
          backable
          onLayout={mapLayoutToState('headerLayout', this)}
        />
        <Content padder>
          <Form>
            <Item regular>
              <Input placeholder={locale['new.title']} style={styles.textbox} />
            </Item>
            <Item regular style={styles.item}>
              <Input placeholder={locale['new.subtitle']} style={styles.textbox} />
            </Item>
            <Item regular style={styles.item}>
              <Input placeholder={locale['new.hashtags']} style={styles.textbox} />
            </Item>
            <Textarea rowSpan={13} bordered placeholder={locale['new.content']} />
          </Form>
          <View style={styles.remarkGroup}>
            <Text style={styles.remark} note>
              {locale['new.markdownRemark']}
            </Text>
            <Text
              style={[styles.remark, styles.hyperlink]}
              onPress={() => Linking.openURL(markdownTutorialLink)}
            >
              Markdown
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
