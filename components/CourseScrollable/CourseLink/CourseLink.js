import React, { Component } from 'react';
import { ListItem, Text, Left, Right, Icon, Content } from 'native-base';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import styles from '../Styles';
import { fadeInDuration } from '../CourseScrollable';

class CourseLink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fadeIn: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration : fadeInDuration
    }).start();
  }

  render() {
    const { title, description, onItemPress } = this.props;

    return (
      <Animated.View style={{ opacity: this.state.fadeIn }}>
        <ListItem
          style={styles.linkItem}
          onPress={() => {
            onItemPress();
            this.props.navigation.goBack();
          }}
        >
          <Left style={styles.linkLeft}>
            <Text numberOfLines={1} style={styles.headerText}>
              {title}
            </Text>
          </Left>
          <Content>
            <Text numberOfLines={1} style={[styles.linkDescription]}>
              {description}
            </Text>
          </Content>
          <Right style={styles.linkRight}>
            <Icon name="arrow-forward" style={[styles.headerText, styles.linkChevron]} />
          </Right>
        </ListItem>
      </Animated.View>
    );
  }
}

CourseLink.defaultProps = {
  onItemPress: () => {}
};

CourseLink.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onItemPress: PropTypes.func
};

export default withNavigation(CourseLink);
