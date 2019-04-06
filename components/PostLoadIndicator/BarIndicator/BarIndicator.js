import React, { PureComponent } from 'react';
import { View } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Placeholder } from 'react-native-loading-placeholder';
import PropTypes from 'prop-types';

import styles from '../Styles';
import { FADE_IN_DURATION } from 'hkufui/components/Constants';

const Wrapper = Animatable.createAnimatableComponent(View);

class BarIndicator extends PureComponent {

  render() {
    const { delay, stalled, paragraph } = this.props;

    const context = (
      <View>
        <View
          style={paragraph ? styles.paragraphGroup : styles.placeholderGroup}
        >
          <Placeholder
            style={[paragraph ? styles.placeholderNoMarginTop : styles.placeholder, styles.placeholderShort]}
          />
          <Placeholder
            style={[styles.placeholder, styles.placeholderLong]}
          />
          <Placeholder
            style={[styles.placeholder, styles.placeholderLong]}
          />
          {paragraph && (
            <View>
              <Placeholder
                style={[styles.placeholder, styles.placeholderLong]}
              />
              <Placeholder
                style={[styles.placeholder, styles.placeholderLong]}
              />
            </View>
          )}
        </View>
        {!paragraph && (
          <View
            style={styles.hr}
          />
        )}
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
  stalled: PropTypes.bool,
  paragraph: PropTypes.bool
}

export default BarIndicator;
