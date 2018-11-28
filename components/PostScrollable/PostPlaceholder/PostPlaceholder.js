import React from 'react';
import PropTypes from "prop-types";
import { Body as NBBody, Text, Icon, View, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';

import styles from './Styles';
import peerStyles from '../PostPreview/Styles';
import { FADE_IN_DURATION } from '../PostScrollable';

const Body = Animatable.createAnimatableComponent(NBBody);

class PostPlaceholder extends React.Component {
  render() {
    const { headline, subHeadline, icon, headlineColor, button } = this.props;

    return (
      <Body style={styles.placeholder} animation="fadeIn" duration={FADE_IN_DURATION}>
        <Text style={{color: headlineColor}}>{headline}</Text>
        {subHeadline && (
          <View style={styles.subHeadline}>
            <Text note>
              {subHeadline}
            </Text>
            {icon && (
              <Icon
                name={icon.name}
                type={icon.type}
                active={icon.active}
                style={[peerStyles.badge, peerStyles.note]}
              />
            )}
          </View>
        )}
        {button && (
          <Button bordered style={styles.button} onPress={button.onPress}>
            <Text note>{button.text}</Text>
          </Button>
        )}
      </Body>
    );
  }
}

PostPlaceholder.propTypes = {
  headline: PropTypes.string.isRequired,
  headlineColor: PropTypes.string,
  subHeadline: PropTypes.string,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    active: PropTypes.bool
  }),
  button: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func
  })
}

export default PostPlaceholder;
