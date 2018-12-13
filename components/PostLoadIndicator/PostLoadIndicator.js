import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View, Content } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { PlaceholderContainer, Placeholder } from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Styles';
import * as consts from './Constants';

const Wrapper = Animatable.createAnimatableComponent(View);

class PostLoadIndicator extends Component {

  _renderGradient() {
    return (
      <LinearGradient
        colors={[consts.LIGHTER_COLOR, consts.DARKER_COLOR, consts.LIGHTER_COLOR]}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 0.0 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const { height } = Dimensions.get('window');
    let context = [];

    for (let i = 0; i < height - consts.EST_FOOTER_HEIGHT - consts.EST_HEADER_HEIGHT; i += consts.LOADER_GROUP_HEIGHT) {
      context.push(
        <Wrapper
          key={i}
          style={styles.placeholderGroup}
          animation='fadeIn'
          duration={250}
          delay={(i / consts.LOADER_GROUP_HEIGHT + 1) * consts.FADE_IN_DURATION}
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
          delay={(i / consts.LOADER_GROUP_HEIGHT + 1) * consts.FADE_IN_DURATION}
        />
      );
    }

    return(
      <Content scrollEnabled={false}>
        <PlaceholderContainer
          animatedComponent={this._renderGradient()}
          duration={consts.PLACEHOLDER_DURATION}
          delay={consts.PLACEHOLDER_DURATION}
        >
          {context}
        </PlaceholderContainer>
      </Content>
    );
  }
}

export default PostLoadIndicator;
