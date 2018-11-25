import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Header, CourseScrollable } from 'hkufui/components'
import { localize } from 'hkufui/locale';
import courses from 'hkufui/mock/public/courses';

import { onUpdateLocation, onSetSelectCourseIndex } from './handleActions';
import { formBreadcrumbString } from './helper';

const locale = localize({ language: 'en', country: 'hk' });

export class SelectCourse extends Component {
  componentDidUpdate() {
    const { breadcrumb } = this.props;

    this._header.setSubtitle(
      formBreadcrumbString(breadcrumb)
    );
  }

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
  courses: courses,
  breadcrumb: []
}

SelectCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateLocation: PropTypes.func.isRequired,
  onSetSelectCourseIndex: PropTypes.func.isRequired,
  breadcrumb: PropTypes.array
}

const mapDispatchToProps = dispatch => ({
  onUpdateLocation: ({item}) => dispatch(onUpdateLocation({item})),
  onSetSelectCourseIndex: (array) => dispatch(onSetSelectCourseIndex(array))
})

const mapStateToProps = state => ({
  breadcrumb: state.location.breadcrumb
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCourse);
