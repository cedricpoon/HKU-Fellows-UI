import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header as NBHeader, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';

import styles from './Styles';

class Header extends Component {
  render() {
    const { title, backable, rightIcon, onRightPress, ...restProps } = this.props;

    return (
      <NBHeader {...restProps} >
        <Left>
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
            <Text>{title}</Text>
          </Title>
        </Body>
        {rightIcon && (
          <Right>
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
  backable: PropTypes.bool,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func
};

export default withNavigation(Header);
