import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header as NBHeader, Left, Body, Right, Button, Icon, Title, Subtitle as NBSubtitle } from 'native-base';
import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import styles from './Styles';

const Subtitle = Animatable.createAnimatableComponent(NBSubtitle);

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = { subtitle: this.props.subtitle };
    this.setSubtitle = this.setSubtitle.bind(this);
  }

  setSubtitle(subtitle) {
    this.setState({
      subtitle: subtitle
    });
  }

  render() {
    const {
      title,
      backable,
      rightIcon,
      onRightPress,
      ...restProps
    } = this.props;

    const { subtitle } = this.state;

    return (
      <NBHeader {...restProps} >
        <Left style={styles.buttonGroup}>
          { backable && (
            <Button
              transparent
              onPress={() => { this.props.navigation.goBack(); }}
            >
              <Icon style={styles.back} name="arrow-dropleft"/>
            </Button>
          )}
        </Left>
        <Body>
          <Title style={styles.title}>
            {title}
          </Title>
          {subtitle && (
            <Subtitle style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Subtitle>
          )}
        </Body>
        {rightIcon && (
          <Right style={styles.buttonGroup}>
            <Button transparent onPress={onRightPress}>
              <Icon name={rightIcon} style={styles.rightIcon} />
            </Button>
          </Right>
        )}
      </NBHeader>
    );
  }
}

Header.defaultProps = {
  onRightPress: () => {}
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backable: PropTypes.bool,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func
};

export default withNavigation(Header);
