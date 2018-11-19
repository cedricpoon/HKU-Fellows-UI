import React, { Component } from 'react';
import { ListItem, Text, Left, Right, Icon, Content } from 'native-base';
import PropTypes from 'prop-types';

import styles from '../Styles';

class CourseLink extends Component {

  render() {
    const { title, description } = this.props;

    return (
      <ListItem style={styles.linkItem}>
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
    );
  }
}

CourseLink.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default CourseLink;
