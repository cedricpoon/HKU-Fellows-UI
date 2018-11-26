import React from 'react';
import PropTypes from "prop-types";
import { Body, Text, Icon, View } from 'native-base';

import styles from './Styles';
import peerStyles from '../PostPreview/Styles';

class PostPlaceholder extends React.Component {
  render() {
    const { headline, subHeadline, icon, headlineColor } = this.props;

    return (
      <View style={styles.placeholder}>
        <Body>
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
        </Body>
      </View>
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
  })
}

export default PostPlaceholder;
