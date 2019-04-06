import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Content, View } from 'native-base';
import { PlaceholderContainer, Placeholder } from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import BarIndicator from './BarIndicator/BarIndicator';

import styles from './Styles';
import * as consts from './Constants';

class PostLoadIndicator extends PureComponent {

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
    const { multiple, page, ...restProps } = this.props;
    const { height } = Dimensions.get('window');
    let context = [];
    const groupHeight = page ? consts.PARAGRAPH_GROUP_HEIGHT : consts.LOADER_GROUP_HEIGHT;

    if (page || multiple) {
      if (page) {
        // render headline
        context.push(
          <View key={-1}>
            <Placeholder
              style={[styles.placeholder, styles.placeholderMedium, styles.paragraphGroup]}
            />
            <View
              style={styles.headlineHr}
            />
          </View>
        );
      }
      for (let i = 0; i < height - consts.EST_FOOTER_HEIGHT - consts.EST_HEADER_HEIGHT; i += groupHeight) {
        context.push(
          <BarIndicator
            key={i}
            delay={(i / consts.LOADER_GROUP_HEIGHT + 1) * consts.DELAY_BASE}
            paragraph={page}
            {...restProps}
          />
        );
      }
    } else {
      context.push(
        <BarIndicator key={0} {...restProps} />
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

PostLoadIndicator.propTypes = {
  multiple: PropTypes.bool,
  page: PropTypes.bool
}

export default PostLoadIndicator;
