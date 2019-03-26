import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Text, Accordion, View, Icon as NBIcon } from 'native-base';
import { FlatList } from 'react-native';

import CourseLink from './CourseLink/CourseLink';
import styles from './Styles';
import {
  getCoursePathByIndex,
  getCoursePathById,
  getIndexByBreadcrumb
} from './helper';

const Icon = Animatable.createAnimatableComponent(NBIcon);

const bouncyIconDuration = 1500;

class CourseScrollable extends Component {

  constructor(props) {
    super(props);
    this.state = { mounted: false }
  }

  collapseAll = () => {
    this._rootAccordion.setSelected(-1);
  }

  _setSelectedWrapper = (ref, pid) => {
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

  _renderHeader = ({title, inner}, expanded) => {
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

  _renderContent = ({children, links, id}) => {
    const { onItemPressWrapper, list, expandedList } = this.props;
    const { mounted } = this.state;

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
                onItemPress={onItemPressWrapper({item})}
                bottomMost={!children}
                {...item}
              />
            )}
            ref={ref => {
              if (ref)
                ref.componentDidUpdate = () => this.setState({ mounted: true });
            }}
          />
        )}
        {children && (
          <Accordion
            dataArray={children}
            expanded={!mounted && getIndexByBreadcrumb(list, expandedList, id)}
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
    const { list, expandedList } = this.props;
    const { mounted } = this.state;

    return (
      <Accordion
        dataArray={list}
        expanded={!mounted && getIndexByBreadcrumb(list, expandedList, '')}
        keyExtractor={item => item.id}
        style={styles.accordion}
        renderContent={this._renderContent}
        renderHeader={this._renderHeader}
        ref={ref => {
          this._rootAccordion = ref;
          if (ref)
            ref.setSelected = this._setSelectedWrapper(ref, '');
        }}
      />
    );
  }
}

CourseScrollable.defaultProps = {
  onItemPressWrapper: () => { return () => {}; },
  onSetSelectCourseIndex: () => {},
  expandedList: []
};

CourseScrollable.propTypes = {
  list: PropTypes.array.isRequired,
  onItemPressWrapper: PropTypes.func,
  onSetSelectCourseIndex: PropTypes.func,
  expandedList: PropTypes.array
};

export default CourseScrollable;
