import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Text, Accordion, View, Icon as NBIcon } from 'native-base';
import { FlatList } from 'react-native';

import CourseLink from './CourseLink/CourseLink';
import { coursesNumToRender } from 'hkufui/config';
import styles from './Styles';

const Icon = Animatable.createAnimatableComponent(NBIcon);

const animationDuration = 1500;

class CourseScrollable extends Component {

  renderHeader({title, inner}, expanded) {
    const activeStyle = inner ? styles.active : styles.exoActive;

    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, expanded && activeStyle]}>
          {title}
        </Text>
        {expanded
          ? <Icon
              animation="rubberBand"
              duration={animationDuration}
              iterationCount="infinite"
              style={[styles.headerText, activeStyle]}
              name="arrow-up"
            />
          : <Icon style={styles.headerText} name="arrow-down" />}
      </View>
    );
  }

  renderContent({children, links}) {
    if (children) {
      children.forEach((elem) => {
        elem.inner = true
      });
    }
    return (
      <View>
        {links && (
          <FlatList
            data={links}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <CourseLink {...item} />
            )}
            initialNumToRender={coursesNumToRender}
          />
        )}
        {children && (
          <Accordion
            dataArray={children}
            style={[styles.accordion, styles.content]}
            renderContent={this.renderContent}
            renderHeader={this.renderHeader}
          />
        )}
      </View>
    );
  }

  render() {
    const { list } = this.props;

    return (
      <Accordion
        dataArray={list}
        style={styles.accordion}
        renderContent={this.renderContent}
        renderHeader={this.renderHeader}
      />
    );
  }
}

CourseScrollable.propTypes = {
  list: PropTypes.array.isRequired
};

export default CourseScrollable;
