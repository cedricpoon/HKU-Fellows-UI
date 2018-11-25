import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header as NBHeader, Left, Body, Right, Button, Icon, Title, Subtitle as NBSubtitle } from 'native-base';
import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import styles from './Styles';

const Subtitle = Animatable.createAnimatableComponent(NBSubtitle);

const subtitleAnimationDuration = 500;

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = { subtitle: this.props.subtitle };
    this.setSubtitle = this.setSubtitle.bind(this);
  }

  setSubtitle(subtitle = null) {
    this.setState({
      subtitle: subtitle
    });
  }

  componentDidUpdate() {
    if (this._subtitle) {
      this._subtitle.pulse(subtitleAnimationDuration);
    }
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
          <Title style={styles.title} ref={ref => { this._title=ref }}>
            {title}
          </Title>
          {subtitle && (
            <Subtitle
              ref={ref => { this._subtitle = ref }}
              style={styles.subtitle}
              numberOfLines={1}
            >
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
  onRightPress: () => {},
  subtitle: null
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backable: PropTypes.bool,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func
};

export default withNavigation(Header);
