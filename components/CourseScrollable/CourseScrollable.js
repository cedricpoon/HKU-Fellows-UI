import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Text, Accordion, View, Icon as NBIcon } from 'native-base';
import { FlatList } from 'react-native';

import CourseLink from './CourseLink/CourseLink';
import styles from './Styles';
import { getCoursePathByIndex, getCoursePathById } from './helper';

const Icon = Animatable.createAnimatableComponent(NBIcon);

const bouncyIconDuration = 1500;

class CourseScrollable extends Component {

  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._setSelectedWrapper = this._setSelectedWrapper.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  collapseAll() {
    this._rootAccordion.setSelected(-1);
  }

  _setSelectedWrapper(ref, pid) {
    const { list, onSetSelectCourseIndex } = this.props;

    return (index) => {
      /* cloned from Accordion */
      if (ref.state.selected === index) {
        ref.setState({ selected: undefined });
        onSetSelectCourseIndex(getCoursePathById(list, pid));
      } else {
        ref.setState({ selected: index });
        if (index !== -1)
          onSetSelectCourseIndex(getCoursePathByIndex(list, pid, index));
        else
          onSetSelectCourseIndex([]);
      }
    };
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

  _renderContent({children, links, id}) {
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
            /* first link id as list key */
            listKey={links[0].id}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <CourseLink
                onItemPress={this.props.onItemPressWrapper({item})}
                bottomMost={!children}
                {...item}
              />
            )}
          />
        )}
        {children && (
          <Accordion
            dataArray={children}
            /* first child id as list key */
            listKey={children[0].id}
            keyExtractor={item => item.id}
            style={[styles.accordion, styles.content]}
            renderContent={this._renderContent}
            renderHeader={this._renderHeader}
            ref={ref => {
              if (ref) {
                ref.setSelected = this._setSelectedWrapper(ref, id)
              }
            }}
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
        ref={ref => {
          this._rootAccordion = ref;
          ref.setSelected = this._setSelectedWrapper(ref, '');
        }}
        {...restProps}
      />
    );
  }
}

CourseScrollable.defaultProps = {
  onItemPressWrapper: () => { return () => {}; },
  onSetSelectCourseIndex: () => {}
};

CourseScrollable.propTypes = {
  list: PropTypes.array.isRequired,
  onItemPressWrapper: PropTypes.func,
  onSetSelectCourseIndex: PropTypes.func
};

export default CourseScrollable;
