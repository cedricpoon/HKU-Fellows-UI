import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Text, Accordion, View, Icon as NBIcon } from 'native-base';
import { FlatList } from 'react-native';

import CourseLink from './CourseLink/CourseLink';
import styles from './Styles';

const Icon = Animatable.createAnimatableComponent(NBIcon);

const bouncyIconDuration = 1500;

class CourseScrollable extends Component {

  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  collapseAll() {
    this._rootAccordion.setSelected(-1);
  }

  _renderHeader({title, inner}, expanded) {

    const activeStyle = inner ? styles.active : styles.exoActive;

    return (
      <View
        style={styles.header}
      >
        <Text
          style={[
            styles.title,
            styles.headerText,
            expanded && activeStyle
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {expanded
          ? <Icon
              animation="rubberBand"
              duration={bouncyIconDuration}
              iterationCount="infinite"
              style={[styles.headerText, activeStyle]}
              name="arrow-up"
            />
          : <Icon style={styles.headerText} name="arrow-down" />}
      </View>
    );
  }

  _renderContent({children, links}) {
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
          />
        )}
        {children && (
          <Accordion
            dataArray={children}
            keyExtractor={item => item.id}
            style={[styles.accordion, styles.content]}
            renderContent={this._renderContent}
            renderHeader={this._renderHeader}
          />
        )}
      </View>
    );
  }

  render() {
    const { list, ...restProps } = this.props;

    return (
      <Accordion
        dataArray={list}
        keyExtractor={item => item.id}
        style={styles.accordion}
        renderContent={this._renderContent}
        renderHeader={this._renderHeader}
        ref={ref => this._rootAccordion = ref}
        {...restProps}
      />
    );
  }
}

CourseScrollable.propTypes = {
  list: PropTypes.array.isRequired
};

export default CourseScrollable;
