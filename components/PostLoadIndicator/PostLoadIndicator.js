import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View, Content } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { PlaceholderContainer, Placeholder } from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Styles';

const LOADER_GROUP_HEIGHT = 80;
const FADE_IN_DURATION = 40;
const EST_HEADER_HEIGHT = 65;
const EST_FOOTER_HEIGHT = 55;
const PLACEHOLDER_DURATION = 1000;
const LIGHTER_COLOR = '#eee';
const DARKER_COLOR = '#ddd';

const Wrapper = Animatable.createAnimatableComponent(View);

class PostLoadIndicator extends Component {

  _renderGradient() {
    return (
      <LinearGradient
        colors={[LIGHTER_COLOR, DARKER_COLOR, LIGHTER_COLOR]}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 0.0 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const { height } = Dimensions.get('window');
    let context = [];

    for (let i = 0; i < height - EST_FOOTER_HEIGHT - EST_HEADER_HEIGHT; i += LOADER_GROUP_HEIGHT) {
      context.push(
        <Wrapper
          key={i}
          style={styles.placeholderGroup}
          animation='fadeIn'
          duration={250}
          delay={(i / LOADER_GROUP_HEIGHT + 1) * FADE_IN_DURATION}
        >
          <Placeholder
            style={[styles.placeholder, styles.placeholderShort]}
          />
          <Placeholder
            style={[styles.placeholder, styles.placeholderLong]}
          />
          <Placeholder
            style={[styles.placeholder, styles.placeholderLong]}
          />
        </Wrapper>
      );
      context.push(
        <Wrapper
          key={`${i}s`}
          style={styles.hr}
          animation='fadeIn'
          duration={250}
          delay={(i / LOADER_GROUP_HEIGHT + 1) * FADE_IN_DURATION}
        />
      );
    }

    return(
      <Content scrollEnabled={false}>
        <PlaceholderContainer
          animatedComponent={this._renderGradient()}
          duration={PLACEHOLDER_DURATION}
          delay={PLACEHOLDER_DURATION}
        >
          {context}
        </PlaceholderContainer>
      </Content>
    );
  }
}

export default PostLoadIndicator;
