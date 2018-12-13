import React, { Component } from 'react';
import { View } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Placeholder } from 'react-native-loading-placeholder';
import PropTypes from 'prop-types';

import styles from '../Styles';
import { FADE_IN_DURATION } from '../Constants';

const Wrapper = Animatable.createAnimatableComponent(View);

class BarIndicator extends Component {

  render() {
    const { delay, stalled } = this.props;

    const context = (
      <View>
        <View
          style={styles.placeholderGroup}
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
        </View>
        <View
          style={styles.hr}
        />
      </View>
    );

    // no animation
    if (stalled) {
      return (
        <View>
          {context}
        </View>
      );
    }

    return (
      <Wrapper
        animation='fadeIn'
        duration={FADE_IN_DURATION}
        delay={delay}
      >
        {context}
      </Wrapper>
    );
  }
}

BarIndicator.defaultProps = {
  delay: 0
}

BarIndicator.propTypes = {
  delay: PropTypes.number,
  stalled: PropTypes.bool
}

export default BarIndicator;
