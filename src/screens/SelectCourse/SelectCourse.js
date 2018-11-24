import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header, CourseScrollable } from 'hkufui/components'
import { localize } from 'hkufui/locale';
import courses from 'hkufui/mock/public/courses';

import { onUpdateLocation, onSetSelectCourseIndex } from './handleActions';

const locale = localize({ language: 'en', country: 'hk' });

export class SelectCourse extends Component {
  render() {
    const { courses, onUpdateLocation, onSetSelectCourseIndex } = this.props;

    const onItemPressWrapper = ({item}) => {
      return () => {
        onUpdateLocation({item});
      };
    };

    return (
      <Container>
        <Header
          title={locale['header.course']}
          backable
          rightIcon='arrow-dropup'
          onRightPress={() => {
            this._courseScrollable.collapseAll();
          }}
          onRef={ref => this._header = ref}
        />
        <Content padder>
          <CourseScrollable
            list={courses}
            onItemPressWrapper={onItemPressWrapper}
            onSetSelectCourseIndex={onSetSelectCourseIndex}
            ref={ref => this._courseScrollable = ref}
          />
        </Content>
      </Container>
    );
  }
}

/* Mocking mapStateToProps */
SelectCourse.defaultProps = {
  courses: courses
}

SelectCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateLocation: PropTypes.func.isRequired,
  onSetSelectCourseIndex: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onUpdateLocation: ({item}) => dispatch(onUpdateLocation({item})),
  onSetSelectCourseIndex: (array) => dispatch(onSetSelectCourseIndex(array))
})

export default connect(
  null,
  mapDispatchToProps
)(SelectCourse);
