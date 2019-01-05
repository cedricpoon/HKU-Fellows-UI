import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header as NBHeader, Left, Body, Right, Button, Icon, Title, Subtitle as NBSubtitle } from 'native-base';
import * as Animatable from 'react-native-animatable';

import NavigationService from 'hkufui/src/NavigationService';
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
      this._subtitle.pulse(subtitleAnimationDuration); // eslint-disable-line react/prop-types
    }
  }

  render() {
    const {
      title,
      backable,
      rightIcon,
      onRightPress,
      subtitleNumberOfLines,
      titleNumberOfLines,
      ...restProps
    } = this.props;

    const { subtitle } = this.state;

    return (
      <NBHeader {...restProps} style={styles.header} >
        <Left>
          { backable && (
            <Button
              transparent
              onPress={() => { NavigationService.goBack(); }}
            >
              <Icon style={styles.back} name="arrow-dropleft"/>
            </Button>
          )}
        </Left>
        <Body style={styles.context}>
          <Title
            style={styles.title}
            ref={ref => { this._title=ref }}
            numberOfLines={titleNumberOfLines}
          >
            {title}
          </Title>
          {subtitle && (
            <Subtitle
              ref={ref => { this._subtitle = ref }}
              style={styles.subtitle}
              numberOfLines={subtitleNumberOfLines}
            >
              {subtitle}
            </Subtitle>
          )}
        </Body>
        <Right>
        {rightIcon && (
          <Button transparent onPress={onRightPress}>
            <Icon name={rightIcon} style={styles.rightIcon} />
          </Button>
        )}
        </Right>
      </NBHeader>
    );
  }
}

Header.defaultProps = {
  onRightPress: () => {},
  subtitle: null,
  titleNumberOfLines: 1,
  subtitleNumberOfLines: 1,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  titleNumberOfLines: PropTypes.number,
  subtitle: PropTypes.string,
  subtitleNumberOfLines: PropTypes.number,
  backable: PropTypes.bool,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func
};

export default Header;
