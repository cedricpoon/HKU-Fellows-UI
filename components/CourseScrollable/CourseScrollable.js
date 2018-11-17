import React, { Component } from 'react';
import PropTypes from "prop-types";
import * as Animatable from 'react-native-animatable';
import { Text, Accordion, View, Icon as NBIcon } from 'native-base';

import styles from './Styles';

const Icon = Animatable.createAnimatableComponent(NBIcon);

const dataArray = [
  { id: "0", title: "Engineering Faculty", content: "Lorem ipsum dolor sit amet" },
  { id: "1", title: "Science Faculty", content: "Lorem ipsum dolor sit amet" },
  { id: "2", title: "Faculty of Business and Economics", content: "Lorem ipsum dolor sit amet" }
];

class CourseScrollable extends Component {

  renderHeader({title}, expanded) {
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, expanded && styles.active]}>
          {title}
        </Text>
        {expanded
          ? <Icon
              animation="rubberBand"
              duration={2000}
              delay={0}
              iterationCount="infinite"
              style={[styles.headerText, styles.active]}
              name="arrow-up"
            />
          : <Icon style={styles.headerText} name="arrow-down" />}
      </View>
    );
  }

  renderContent({content}) {
    return (
      <Accordion
        dataArray={dataArray}
        style={[styles.accordion, styles.content]}
        renderContent={this.renderContent}
        renderHeader={this.renderHeader}
      />
    );
  }

  render() {
    return (
      <Accordion
        dataArray={dataArray}
        style={styles.accordion}
        renderContent={this.renderContent}
        renderHeader={this.renderHeader}
      />
    );
  }
}

CourseScrollable.propTypes = {};

export default CourseScrollable;
