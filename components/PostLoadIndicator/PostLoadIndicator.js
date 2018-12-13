import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Content } from 'native-base';
import { PlaceholderContainer } from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import BarIndicator from './BarIndicator/BarIndicator';

import styles from './Styles';
import * as consts from './Constants';

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
    const { multiple, ...restProps } = this.props;
    const { height } = Dimensions.get('window');
    let context = [];

    if (multiple) {
      for (let i = 0; i < height - consts.EST_FOOTER_HEIGHT - consts.EST_HEADER_HEIGHT; i += consts.LOADER_GROUP_HEIGHT) {
        context.push(
          <BarIndicator
            key={i}
            delay={(i / consts.LOADER_GROUP_HEIGHT + 1) * consts.DELAY_BASE}
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
  multiple: PropTypes.bool
}

export default PostLoadIndicator;
