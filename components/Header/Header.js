import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Left, Body, Right, Button, Icon, Title, Subtitle as NBSubtitle } from 'native-base';
import { Header as NBHeader } from 'hkufui/native-base-fork/Header';
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
      rightStyle,
      ...restProps
    } = this.props;

    const { subtitle } = this.state.subtitle ? this.state : this.props;

    return (
      <NBHeader {...restProps} style={styles.header}>
        <Left>
          { backable && (
            <Button
              transparent
              onPress={() => { NavigationService.goBack(); }}
            >
              <Icon style={styles.button} name="arrow-dropleft"/>
            </Button>
          )}
        </Left>
        <Body style={styles.context}>
          <Title
            style={[
              styles.title,
              { fontSize: title.size }
            ]}
            ref={ref => { this._title=ref }}
            numberOfLines={title.numberOfLines || 1}
          >
            {title.context}
          </Title>
          {subtitle && (
            <Subtitle
              ref={ref => { this._subtitle = ref }}
              style={styles.subtitle}
              numberOfLines={subtitle.numberOfLines || 1}
            >
              {subtitle.context}
            </Subtitle>
          )}
        </Body>
        <Right>
        {rightIcon && (
          <Button transparent onPress={onRightPress}>
            <Icon name={rightIcon} style={rightStyle} />
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
  rightStyle: styles.button
};

const contextProptypes = {
  context: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number,
  size: PropTypes.number
}

Header.propTypes = {
  title: PropTypes.shape(contextProptypes).isRequired,
  subtitle: PropTypes.shape(contextProptypes),
  backable: PropTypes.bool,
  rightIcon: PropTypes.string,
  rightStyle: Icon.propTypes.style,
  onRightPress: PropTypes.func
};

export default Header;
